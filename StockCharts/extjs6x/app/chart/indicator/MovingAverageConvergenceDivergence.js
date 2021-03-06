/**
 * @class Chartsly.chart.indicator.MovingAverageConvergenceDivergence
 * @extends Ext.chart.CartesianChart
 *
 * MovingAverageConvergenceDivergence (MACD) chart that looks for numeric axis and adds MACD specific 
 * configuration such as fields. fields is defaulted to ['macd', 'sigmacd'] as this field is 
 * added by the MACD series to the records.
 * 
 * The calculated MACD and signal values are set as "macd" and "sigmacd" fields, respectively, on the record
 */
Ext.define("Chartsly.chart.indicator.MovingAverageConvergenceDivergence", {
    extend: 'Ext.chart.CartesianChart',
    requires: ['Chartsly.series.indicator.MovingAverageConvergenceDivergence', 
                'Chartsly.sprite.indicator.MovingAverageConvergenceDivergence'],

    alternateClassName: ['Chartsly.chart.indicator.MACD', 'Chartsly.chart.MACD'],

    xtype: 'macdchart',

    initConfig: function(config) {

        Ext.Array.each(config.axes, function(axis, index, recs) {
            if (axis.type === 'numeric') {
                Ext.apply(axis, {
                    fields: ['macd', 'sigmacd', 'histmacd']
                });
            }
        });

        //TODO: Find a better solution for preparing the config and drawing MACD signal line.
        //Will re-visit this in the next iteration.
        
        //add a line series for MACD Signal line and a bar for MACD Histogram
        config.series.push({
            store: config.series[0].store,
            type: 'macd',
            xField: 'date',
            yField: 'sigmacd',
            closeField: "close",
            period: config.period,
            signalPeriod: config.signalPeriod,
            // smooth: true,
            style: {
                stroke: 'rgba(255,102,102,0.75)',
                miterLimit: 1
            },
            marker: {
                    opacity: 1,
                    scaling: 0.2,
                    fillStyle : '#E3742D',
                    fx: {
                        duration: 20,
                        easing: 'easeOut'
                    }
                },
                highlightCfg: {
                    opacity: 1,
                    scaling: 1.5
                },
                tooltip: {
                    trackMouse: true,
                    style:{
                        backgroundColor:'#fff',
                        border:'2px solid #E3742D',
                        fontFamily:'Helvetica',
                    },
                    renderer: function(tooltip,record, item) {
                        var open = Util.formatNumber(record.get('open'),"0.0000");
                        var close = Util.formatNumber(record.get('close'),"0.0000");
                        var high = Util.formatNumber(record.get('high'),"0.0000");
                        var low = Util.formatNumber(record.get('low'),"0.0000");
                        var volume = record.get('volume');
                        tooltip.setHtml('<table>'+'<tr>'+'<td>'+'Open:'+'</td>'+'<td>'+'$'+open+'</td>'+'</tr>'+'<tr>'+'<td>'+'Close:'+'</td>'+'<td>'+'$'+close+'</td>'+'</tr>'+'<tr>'+'<td>'+'High:'+'</td>'+'<td>'+'$'+high+'</td>'+'</tr>'+'<tr>'+'<td>'+'Low:'+'</td>'+'<td>'+'$'+low+'</td>'+'</tr>'+'<tr>'+'<td>'+'Volume:'+'</td>'+'<td>'+'$'+volume+'</td>'+'</tr>'+'</table>');
                    }
                }
        }, {
            store: config.series[0].store,
            type: 'bar',
            xField: 'date',
            yField: 'histmacd',
            style: {
                stroke: 'rgba(228,124,124,0.75)',
                fillStyle: 'rgba(228,124,124,0.75)'
            },
            marker: {
                    opacity: 1,
                    scaling: 0.01,
                    fillStyle : '#E3742D',
                    fx: {
                        duration: 20,
                        easing: 'easeOut'
                    }
                },
                highlightCfg: {
                    opacity: 1,
                    scaling: 1.5
                },
                tooltip: {
                    trackMouse: true,
                    style:{
                        backgroundColor:'#fff',
                        border:'2px solid #E3742D',
                        fontFamily:'Helvetica',
                    },
                    renderer: function(tooltip,record, item) {
                        var open = Util.formatNumber(record.get('open'),"0.0000");
                        var close = Util.formatNumber(record.get('close'),"0.0000");
                        var high = Util.formatNumber(record.get('high'),"0.0000");
                        var low = Util.formatNumber(record.get('low'),"0.0000");
                        var volume = record.get('volume');
                        tooltip.setHtml('<table>'+'<tr>'+'<td>'+'Open:'+'</td>'+'<td>'+'$'+open+'</td>'+'</tr>'+'<tr>'+'<td>'+'Close:'+'</td>'+'<td>'+'$'+close+'</td>'+'</tr>'+'<tr>'+'<td>'+'High:'+'</td>'+'<td>'+'$'+high+'</td>'+'</tr>'+'<tr>'+'<td>'+'Low:'+'</td>'+'<td>'+'$'+low+'</td>'+'</tr>'+'<tr>'+'<td>'+'Volume:'+'</td>'+'<td>'+'$'+volume+'</td>'+'</tr>'+'</table>');
                    }
                }
        });

        this.callParent(arguments);
    }
});

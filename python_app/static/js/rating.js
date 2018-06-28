$( document ).ready(function() {
    console.log( "ready!" );
});

Plotly.d3.select(window).on("resize", makeResponsive);

makeResponsive();

function makeResponsive() {

    var plotlyPlot = Plotly.d3.select("#graph").select("div");
    !plotlyPlot.empty()? plotlyPlot.remove(): console.log('plot empty');

    var width = window.innerWidth-15;
    var height = window.innerHeight-20;

    var plotd3 = Plotly.d3.select('#graph')
    .append('div')
    .style({
        width: window.innerWidth-15,
        'margin-left': 5 + '%',
        height: window.innerHeight-60,
        'margin-top': 5 + 'vh'
    });

    var plot = plotd3.node();

    Plotly.d3.json('/rating', function(data) {
        // console.log(data)

        data.forEach(el => {
            var date = $.datepicker.formatDate('yy-mm-dd', new Date(el.Date));
            el.DateOnly = date;
        });

        var x = data.map(el => el.Date);
        var y = data.map(el => el.Rating);


        var average = y.reduce((sum, el, ind, arr) => {
            sum += el;
            if( ind === arr.length-1) { 
                return sum/arr.length;
            } else { 
                return sum;
            }
        });

        function round(value, decimals) {
            return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
          }
        average = round(average, 2);

        var frames = [];
        for (var i = 0; i < x.length; i++) { 
            frames[i] = {data: [{x: [], y: []}]}
            frames[i].data[0].x = x.slice(0, i+1);
            frames[i].data[0].y = y.slice(0, i+1);
        };

        Plotly.plot(plot, [{
            x: x,
            y: y,
            fill: 'tozeroy',
            type: 'scatter',
            mode: 'markers',
            line: {color: 'blue'}
        }], {
            title: 'The average rating is ' + average,
            xaxis: {
            showticklabels: true,
            tickangle: 35,
            tickfont: {
                size: 14,
                color: 'darkblue'
              },
            linecolor: 'darkblue',
            linewidth: 2
            },
            yaxis: {
                range: [
                0,
                5.5
                ],
                tickfont: {
                    size: 14,
                    color: 'darkblue'
                  },
                linecolor: 'darkblue',
                linewidth: 2
            },
            updatemenus: [{
                x: 0.1,
                y: 0,
                yanchor: "top",
                xanchor: "right",
                showactive: true,
                direction: "left",
                type: "buttons",
                pad: {"t": 87, "r": 10},
                buttons: [{
                method: "animate",
                args: [null, {
                    fromcurrent: false,
                    transition: {
                    duration: 0,
                    easing: 'linear'
                    },
                    frame: {
                    duration: 200,
                    redraw: false
                    }
                }],
                label: "P"
                }, {
                method: "animate",
                args: [
                    [null],
                    {
                    mode: "immediate",
                    transition: {
                        duration: 0
                    },
                    frame: {
                        duration: 0,
                        redraw: false
                    }
                    }
                ],
                label: 'S',
                }]
            }]
            
        }).then(function() {
            Plotly.addFrames(plot, frames);
        });

        Plotly.d3.select('.updatemenu-item-text')
        .classed('fa fa-play', true)
        // .classed('glyphicons-play', true)

        console.log('gl added')

    });

    
}
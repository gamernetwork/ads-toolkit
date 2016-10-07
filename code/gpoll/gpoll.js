/**
 * Gpoll this ad
 *
 * Copyright 2016 Gamer Network
 */

(function($, window, undefined) {

    $.fn.gpollAd = function(options) {

        // Default options
        var defaults = $.extend({
            campaign_id: '1', // ID ofthe campaign
            question_id: '1', // ID of the question
            answers_id: '', // if set, puts answers list in this parent
            response_count: '1', // how many options the user can choose
            graph_id: '', // if set, then put the responses on a graph
            graph_axis: 'x', // set the graph to use x or y axis
            extras : '' // JSON array of more info like text/images
        }, options);

        var voter = $(this);

        loadAnswers = function() {

          $.getJSON( 'https://gpoll.gamer-network.net/gpoll/getAnswers/' + defaults.question_id + '?callback=?', function(data) {

              var ordered_by_responses = [];

              // Sort returned data by response count
              $.each(data, function(key, val) {
                  retuned_responses = {id: key, responses: val['responses']};
                  ordered_by_responses.push(retuned_responses);
              });

              ordered_by_responses.sort(function(a, b) {
                  return b.responses - a.responses;
              });

              // Get top response
              top_response = ordered_by_responses.slice(0, 1);

              if(defaults.answers_id) {
                
                // Set-up the form elements
                $(defaults.answers_id, voter).append('<form class="vote-answers-form" action="/vote" method="post"></form>');
                $('.vote-answers-form', voter).append('<input type="hidden" name="campaign_id" value="' + defaults.campaign_id + '" />');
                $('.vote-answers-form', voter).append('<input type="hidden" name="question_id" value="' + defaults.question_id + '" />');

                var items = [];

                // Put together answer form
                $.each(data, function(key, val) {
                    
                    image_html = '';
                    if(defaults.extras[key]['image']) {
                      image_html = '<div class="col-md-3 answer-image"><img src="' + defaults.extras[key]['image'] + '" /></div>';
                    }

                    text_html = '';
                    if(defaults.extras[key]['text']) {
                      text_html = '<p>' + defaults.extras[key]['text'] + '</p>';
                    }

                    items.push('<div class="container"><div class="row answer answer-' + key + '">' + image_html + '<div class="col-md-6 answer-details"><h4>' + key + ') ' + val['title'] + '</h4>' + text_html + '</div><div class="col-md-3 answer-checkbox"><input type="checkbox" name="answers[]" value="' + val['id'] + '" /><label for="radio1"></label><span>' + val['responses'] + ' votes</span></div></div></div>');
                });
              
                $('<div/>', {
                    'class': 'vote-answer-list',
                    html: items.join('')
                }).prependTo($('.vote-answers-form', voter));

                answers_selected = 0;

                $("input:checkbox", voter).click(function() {
                    var group = "input:checkbox[name='" + $(this).attr("name") + "']";
                    if ($(this).is(":checked")) {
                        answers_selected++;
                        //$(group).prop("checked", false);
                        $(this).prop("checked", true);
                        if(answers_selected >= defaults.response_count) {
                          $(group).not(":checked").attr("class", "inactive").prop('disabled', true);
                        }
                        $(this).attr("class", "active");
                    } else {
                        answers_selected--;
                        $(this).prop("checked", false);
                        if(answers_selected < defaults.response_count) {
                          $(group).attr("class", "active").prop('disabled', false);
                        }
                    }
                });

                $('.vote-answers-form', voter).append('<div class="vote-submit-button container"><div class="row"><div class="col-md-12"><label for="email">Email address: </label><input type="text" class="email email-box" name="email" placeholder="hello@hello.co.uk" />    <input type="submit" value="Submit" class="submit-button button red" /></div></div></div>');

                $('.vote-answers-form', voter).append('<div class="vote-message" class="container"></div>');

                $('.vote-answers-form', voter).submit(function(event) {
 
                  event.preventDefault();

                  var form = $(this);
                  var url = 'https://gpoll.gamer-network.net/gpoll/vote';


                  function successFunction(data) {
                      $('.vote-message', voter).append(data);
                  }
                   
                  var posting = $.post( 
                    url, 
                    form.serialize() 
                  );

                  posting.done(function( data ) {
                      $('.vote-message', voter).html(data);
                      var message = '<p>' + j('h1', '#vote-message').text() + '</p>';
                      $('.vote-message h1', voter).remove();
                      $('.vote-message', voter).html(message);
                  });
                  
                });

              }

              if(defaults.graph_id) {

                if(defaults.graph_axis == 'y') {

                  // Graph on the y-axis
                  var counts = [];
                  var high_count = 0;
                  var yaxis = [];

                  graph = $(defaults.graph_id, voter);
                  graph.append('<div class="vote-results ygraph"></div>');
                  graph.append('<div class="vote-yaxis"></div>');

                  $.each(data, function(key, val) {
                    var top_class = 'normal';
                    $.each(top_response, function(top_key, top_val) {
                      if(key == top_val['id']) {
                        top_class = 'top';
                      }
                    });
                    if(val['responses'] > 0) {
                      display_count = val['responses'];
                    } else {
                      display_count = '';
                    }
                    counts.push('<div class="ycol yval-' + key + '"><span class="ynum">' + key + ') ' + val['title'] + '</span></div><div class="bar result-' + key + ' ' + top_class + '"><span class="bar-num">' + display_count + '</span></div>');
                    if(parseInt(val['responses']) > high_count) {
                      high_count = val['responses'];
                    }
                  });
                  
                  $('<div/>', {
                      'class': 'results-count',
                      html: counts.join('')
                  }).appendTo($('.vote-results', voter));

                  // Graph dimensions
                  graph_width = graph.width();
                  graph_height = graph.height();

                  // Bar dimensions
                  bar_width = Math.floor((100 / $('div.bar', voter).length));
                  bar_left = 0;
                  count_bars = 1;

                  // Render graph based on results
                  $('div.bar', voter).each(function() {
                    bar_percent = Math.floor((parseInt($(this).text()) / high_count) * 100);

                    $(this).css({
                      'width' : bar_percent + '%'
                    });

                    bar_left = bar_left + bar_width;

                    count_bars++;

                  });

                } else {

                  // Graph on the x-axis

                  // Put counts into bars
                  var counts = [];
                  var high_count = 0;
                  var xaxis = [];

                  graph = $(defaults.graph_id, voter);
                  graph.append('<div class="vote-results xgraph"></div>');
                  graph.append('<div class="vote-xaxis"></div>');

                  $.each(data, function(key, val) {
                    var top_class = 'normal';
                    $.each(top_response, function(top_key, top_val) {
                      if(key == top_val['id']) {
                        top_class = 'top';
                      }
                    });
                    if(val['responses'] > 0) {
                      display_count = val['responses'];
                    } else {
                      display_count = '';
                    }
                    counts.push('<div class="bar result-' + key + ' ' + top_class + '"><span class="bar-num">' + display_count + '</span></div>');
                    if(parseInt(val['responses']) > high_count) {
                      high_count = val['responses'];
                    }
                    xaxis.push('<div class="xcol xval-' + key + '"><span class="xnum">' + key + '</span></div>');
                  });
                  
                  $('<div/>', {
                      'class': 'results-count',
                      html: counts.join('')
                  }).appendTo($('.vote-results', voter));

                  $('<div/>', {
                      'class': 'results-xaxis',
                      html: xaxis.join('')
                  }).appendTo($('.vote-xaxis', voter));

                  // Graph dimensions
                  graph_width = graph.width();
                  graph_height = graph.height();

                  // Bar dimensions
                  bar_width = Math.floor((100 / $('div.bar', voter).length));
                  bar_left = 0;
                  count_bars = 1;

                  // Render graph based on results
                  $('div.bar', voter).each(function() {
                    bar_percent = Math.floor((parseInt($(this).text()) / high_count) * 100);

                    $(this).css({
                      'width' : bar_width - 4 + '%',
                      'height' : bar_percent + '%',
                      'left' : bar_left + '%',
                      'margin' : '0 2%'
                    });

                    $('div.xval-' + count_bars).css({
                      'width' : bar_width - 4 + '%',
                      'left' : bar_left + '%',
                      'margin' : '0 2%'
                    });

                    bar_left = bar_left + bar_width;

                    count_bars++;
                  });

                }

                

              }

          });

        }

        loadAnswers();

    }

})(window.$, window);
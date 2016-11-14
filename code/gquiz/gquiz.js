/**
 * Gquiz this ad
 *
 * Copyright 2016 Gamer Network
 */

(function($, window, undefined) {

    $.fn.gquizAd = function(options) {

        // Default options
        var defaults = $.extend({
            campaign_id: '1', // ID ofthe campaign,
            quiz_type: 'multiple', // default is a multiple-choice quiz, single only shows one question
            container_id: '', // puts quiz questions in this parent
            randomise: false, // if ture, randomises question order
            lives: 0, // number of lives, infinite lives if 0
            score_multipler: 1, // every correct answer is worth 1 point, unless multiplied by this value
            timer: 0, // sets number of seconds for each question, inifinite time if 0
            entries_id: '', // if set, then put the entries in this parent
            entries_count: 10 // number of entries responses to return
        }, options);

        var quiz = $(this);

        parent.jQuery('head').append("<script type='text/javascript' src='//images.eurogamer.net/2014/plugins/fancybox/jquery.fancybox.min.js'><\/script>");
        parent.jQuery('head').append("<link rel='stylesheet' href='//images.eurogamer.net/2014/plugins/fancybox/styles/jquery.fancybox.css' type='text/css' media='screen' \/>");

        function getEntries() {
            $.getJSON('https://gquiz.gamer-network.net/quizes/' + defaults.campaign_id + '/recent/' + defaults.entries_count + '/?callback=?', function(data) {

                var items = [];
                $.each(data, function(key, val) {
                    items.push('<li><span class="username">' + key + '</span><span class="score">' + val + '</span></li>');
                });

                $('<ul/>', {
                    'class': 'entries-list',
                    html: items.join('')
                }).prependTo($(defaults.entries_id, quiz));

            });
        }

        function IsEmail(email) {
            var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            return regex.test(email);
        }

        function playAgain() {
            $('#lives_count', quiz).html('');
            getQuestions();
        }

        function quizSubmit(message) {
            
            $('#score_wrapper', quiz).hide();
            $('#lives_wrapper', quiz).hide();
            $('#timer-wrapper', quiz).hide();
            $('#quiz-stats', quiz).hide();

            if(user_score <= max_score) {
                
                question_html = '';

                if(defaults.quiz_type !== 'single') {
                    if(user_score == max_score) {
                        question_html += '<h2>High Score! Congratulations</h2>';
                    } else {
                        question_html += '<h2>' + message + '</h2>';
                    }
                    question_html += '<p>Your score<br/><span class="final_score">' + user_score + '</strong></p><div id="submitted"><p><a src="#" class="btn btn-default" id="start_quiz">Play Again</a></p></div>';
                } else {
                    question_html += '<h2>Thank you, your answer has been logged!</h2>';
                }

                question_html += '<form id="submit_form" action="/score" method="post"><div class="form-group"><label for="email">Email:</label><input required type="email" class="email form-control" placeholder="Email" name="email"></div><div class="form-group"><label for="username">Username:</label><input required type="text" class="form-control username" placeholder="Username" name="username"></div><div class="checkbox"><label for="policy"><input required type="checkbox" class="policy"> I agree to the <a href="#" id="open_terms">terms and conditions</a>.</label> <div id="policy-text"></div></div><input type="hidden" name="score" value="' + user_score + '"><input type="hidden" name="answers" value="' + session_log + '"><input type="hidden" name="quiz_id" value="' + defaults.campaign_id + '"><input type="hidden" name="option" /><input type="hidden" name="contact" value="1" /><button type="submit" class="btn btn-default" id="quiz_submit_link">Submit Score</button></form>';
                

                $('#quiz_wrapper', quiz).html(question_html);

                $('#quiz_submit_link', quiz).click(function(e) {
                    e.preventDefault();
                    $('#submit_form', quiz).submit();
                });

                $('#start_quiz', quiz).on('click', function(e) {
                    e.preventDefault();
                    playAgain();
                });

                $('#open_terms', quiz).on('click', function(e) {
                    e.preventDefault;
                    parent.jQuery.fancybox({
                        type        : 'inline',
                        content     : $('#quiz-terms', quiz).show(),
                        maxWidth    : 960,
                        maxHeight   : 568,
                        fitToView   : true,
                        width       : '90%',
                        height      : '90%',
                        autoSize    : true,
                        scrolling   : 'yes',
                        padding     : '0'           
                    });
                    
                });

                $('#submit_form', quiz).submit(function(event) {

                    event.preventDefault();

                    validEmail = IsEmail($('.email', this).val());
                    username = $('.username', this).val();

                    checks = $('.policy', this);
                    checked = true;
                    for(i=0;i<checks.length;i++) {
                        if(checks[i].checked == false){
                            checked = false;
                        }
                    }
                 
                    if (validEmail == false) {
                      alert('Please enter a valid email first!');
                      return false;
                    } else if(username == '') {
                      alert('Please enter your name');
                      return false; 
                    } else if(checked == false) {
                      alert('Please agree to the T&Cs');
                      return false;     
                    } else {
                        var form = $(this);
                        var url = 'https://gquiz.gamer-network.net/score';

                        var posting = $.post( 
                            url, 
                            form.serialize() 
                        );

                        posting.done(function( data ) {
                            
                            $('#quiz_wrapper', quiz).html('<div id="submit_message"><p></p></div>');
                            $('#submit_message p', quiz).html(data);
                            $('#quiz_wrapper form', quiz).hide();

                        });
                
                    } 
                    
                });

            } else {

                $('#quiz_wrapper', quiz).html('<h2>' + message + '</h2><p>Your score<br/><span class="final_score">' + user_score + '</strong></p><p><a src="#" class="btn btn-default" id="start_quiz">Play Again</a></p>');
                $('#start_quiz', quiz).on('click', function(e) {
                    e.preventDefault();
                    playAgain();
                });

            }

        }

        function updateQuestion(qArr, question_numbers) {

            if(qArr.length > 0) {

                question_html = '<p class="quiz_question_number">Question ' + question_numbers + '</p>';
                question_html += '<p class="quiz_question">' + qArr[0][1]['question'] + '</p>';
                question_html += '<div id="quiz_answers">';
                $.each(qArr[0][1]['answers'], function(k, content) {
                    question_html += '<span><a src="#" class="btn btn-default" data-answer-id="' + k + '">' + content.answer + '</a></span>';
                });
                question_html += '</div>';

                question_numbers++;

                if(defaults.quiz_type == 'single') {
                    $('#quiz_wrapper', quiz).append(question_html);
                } else {
                    $('#quiz_wrapper', quiz).html(question_html);
                }

                if(defaults.timer > 0) {
                    $('#timer-wrapper', quiz).css({'display':'block'});
                    $('#timer-wrapper', quiz).css({'width':'100%'});
                    $('#timer', quiz).css({'width':'100%'});

                    $('#timer', quiz).animate({'width':'0'}, defaults.timer * 1000, "linear");

                    qTimer = setTimeout(function(){
                        $('#timer', quiz).stop( true, true );
                        $('#timer', quiz).css({'width':'100%'});

                        session_log += '{' + qArr[0][0] + ': 0},';

                        $('#incorrect', quiz).fadeIn(0);
                        $('#incorrect', quiz).fadeOut(200);
                        if(lives_on) {
                            --lives;
                            if (lives == 0) {
                                quizSubmit('GAME OVER');
                            } else {
                                life = $('#lives_count li', quiz)[lives];
                                $(life).fadeOut();
                                qArr.shift();
                                updateQuestion(qArr, question_numbers);
                            }
                        } else {
                            qArr.shift();
                            updateQuestion(qArr, question_numbers);
                        }

                    }, defaults.timer * 1000);
                }

                $('#quiz_answers a', quiz).on('click', function(e){

                    e.preventDefault();

                    if(defaults.timer > 0) {
                        clearTimeout(qTimer);
                    }

                    $('#timer', quiz).stop( true, true );

                    answered = $(this).attr('data-answer-id');

                    session_log += '{' + qArr[0][0] + ':' + answered + '},';

                    if(qArr[0][1]['answers'][answered]['mode'] == 1) {
                        $(this).addClass('correct');
                        aTimerCorrect = setTimeout(function(){
                            // $('#correct').fadeIn(0);
                            // $('#correct').fadeOut(200);
                            user_score = user_score + (1 * defaults.score_multipler);
                            $('#score_wrapper .score-number', quiz).html(user_score);
                            qArr.shift();
                            updateQuestion(qArr, question_numbers);
                        }, 500);
                    } else {
                        $(this).addClass('incorrect');
                        aTimerIncorrect = setTimeout(function(){
                            // $('#incorrect').fadeIn(0);
                            // $('#incorrect').fadeOut(200);
                            if(lives_on) {
                                --lives;
                                if (lives == 0) {
                                    quizSubmit('GAME OVER');
                                } else {
                                    life = $('#lives_count li', quiz)[lives];
                                    $(life).fadeOut();
                                    if(lives==1) {
                                        $('#lives_count li', quiz).addClass('blink_me');
                                    }
                                    qArr.shift();
                                    updateQuestion(qArr, question_numbers);
                                }
                            } else {
                                qArr.shift();
                                updateQuestion(qArr, question_numbers);
                            }
                        }, 500);
                        
                    }

                });

            } else {

                quizSubmit('GAME OVER');

            }

        }

        function getQuestions() {
            
            $.getJSON('https://gquiz.gamer-network.net/quizes/' + defaults.campaign_id + '/questions/all/?callback=?', function(data) {

                var questions = [];

                $.each(data, function(i, question) {

                    aArr = [];

                    $.each(question.answers, function(j, answer) {
                        aArr[j] = [answer.answer, answer.mode];
                    });

                    if(aArr.length > 0) {
                        questions.push([i, question]);
                    }

                });

                var question_count = questions.length; 
                            
                // randomise question array if set
                if(defaults.randomise) {
                    var qArr = []; 
                    for ( var i = 0; i < question_count-1; i++ ) { 
                        qArr.push(questions.splice(Math.floor(Math.random()*questions.length),1)[0]); 
                    }
                    qArr.push(questions[0]); 
                } else {
                    qArr = questions;
                }

                if(defaults.quiz_type == 'single') {
                    var qArr = []; 
                    qArr.push(questions[0]);
                }

                session_log = '';
                user_score = 0;
                max_score = question_count * defaults.score_multipler;
                lives = defaults.lives;
                lives_on = false;
                question_numbers = 1;

                if(lives > 0) {
                    lives_on = true;
                    lives_html = '';
                    for ( var l = 0; l < lives; l++ ) { 
                        lives_html += '<li></li>';
                    }

                    $('<ul/>', {
                        'class': 'lives-list',
                        html: lives_html
                    }).prependTo($('#lives_count', quiz));
                }

                $('#score_wrapper .score-number', quiz).html(user_score);

                $('#score_wrapper', quiz).show();
                $('#lives_wrapper', quiz).show();
                $('#quiz-stats', quiz).show();

                // Show first question
                updateQuestion(qArr, question_numbers);

            });
        }

        if(defaults.container_id) {
            getQuestions();
        }

        if(defaults.entries_id) {
          getEntries();
        }

    }

})(window.$, window);
"use strict";

angular.module('eventx').directive('fullCalendar', function ($log, $timeout, $compile) {

  var lnk = function (scope, element) {
    var $calendar = $("#calendar");
    var calendar = null;
    scope.newEvent.icon = 'mdi-action-event';
    
    $('.event-collapse').sideNav({
      menuWidth: 450,
      edge: 'right'
    });

        
    $('.event-close-collapse').click(function () {
      $('.event-collapse').sideNav('hide');
    });
    
    var alertOnEventClick = function (date, jsEvent, view) {
      if (date.isHoliday) { return false; }
      if (date.url) { return false; }
      $('.event-collapse').sideNav('show');
      scope.focus = true;
      $timeout(function () {
        scope.newEvent = angular.copy(date);
        scope.newEvent.className = date.className.join(' ');
        scope.eve = {
          name: date.title,
          start: moment(date.start).format('MMM, D dddd'),
          from: moment(date.start).format('h:mm A'),
          to: moment(date.end || date.start).format('h:mm A')

        };
      });
    };
    
    function initCalendar() {
      calendar = $calendar.fullCalendar({
        lang: 'en',
        editable: true,
        draggable: false,
        selectable: true,
        selectHelper: true,
        unselectAuto: false,
        eventOverlap: false,
        disableResizing: true,
        droppable: true,
        eventLimit: true, // allow "more" link when too many events
        slotEventOverlap: false,
        header: {
          left: 'title', //,today
          center: 'prevYear,prev,next,nextYear, today',
          right: 'month,agendaWeek,agendaDay' //month, agendaDay,
        },
        // contentHeight:'auto',
        minTime:"9:00",
        maxTime:"22:00",
        defaultView: 'month',
        eventClick: alertOnEventClick,
        selectConstraint: 'businessHours',
        eventConstraint: 'businessHours',
        firstDay: 1,
        handleWindowResize: true,
        weekends: false, // Hide weekends
        businessHours: scope.slots,
        allDaySlot: true,
        googleCalendarApiKey: 'AIzaSyDcnW6WejpTOCffshGDDb4neIrXVUA1EAE',
        viewRender: function (view, element) {
          if (view.name === "agendaDay") {
            $('#calendar').fullCalendar('option', 'contentHeight', 'auto');
          }
          else if (view.name === "month") {
            $('#calendar').fullCalendar('option', 'contentHeight', '');
          }
        },
        eventDrop: function (event, delta, revertFunc, jsEvent, ui, view) {
          var defaultDuration = moment.duration($('#calendar').fullCalendar('option', 'defaultTimedEventDuration'));
          var end = event.end || event.start.clone().add(defaultDuration);
          //console.log('end is ' + end.format());
          scope.newEvent = angular.copy(event);
          scope.newEvent.className = event.className.join(' ');
          scope.addAppointment();
        },
        eventResize: function (event, delta, revertFunc) {
          // console.log(event._id);
          // console.log("Start time: " + event.start.format() + "end time: " + event.end.format());
          scope.newEvent = angular.copy(event);
          scope.newEvent.className = event.className.join(' ');
          scope.addAppointment();

        },
        // timeFormat: 'H(:mm)',
        drop: function (date, jsEvent, ui, resourceId) {
          // this function is called when something is dropped
          // retrieve the dropped element's stored Event Object
          var originalEventObject = $(this).data('eventObject');

          // we need to copy it, so that multiple events don't have a reference to the same object
          var copiedEventObject = $.extend({}, originalEventObject);

          var defaultDuration = moment.duration($('#calendar').fullCalendar('option', 'defaultTimedEventDuration'));
          var end = date.clone().add(defaultDuration); // on drop we only have date given to us



          copiedEventObject.start = date.format();
          copiedEventObject.end = end.format();
          copiedEventObject.allDay = false;

          // render the event on the calendar
          // the last `true` argument determines if the event "sticks" (http://arshaw.com/fullcalendar/docs/event_rendering/renderEvent/)
          $('#calendar').fullCalendar('renderEvent', copiedEventObject, false);

          // is the "remove after drop" checkbox checked?
          if ($('#drop-remove').is(':checked')) {
            // if so, remove the element from the "Draggable Events" list
            // $(this).remove();
            // $log.log($(this).scope());
            var index = $(this).scope().$index;
            $("#external-events").scope().eventsExternal.splice(index, 1);
            $(this).remove();
          }
          scope.newEvent = angular.copy(copiedEventObject);
          scope.addAppointment();
        },

        select: function (start, end, allDay) {
          scope.newEvent = {};
           scope.newEvent.icon = 'mdi-action-event';
          $timeout(function () {
            $('.event-collapse').sideNav('show');
            scope.focus = true;
            scope.eve = {
              start: moment(start).format('MMM, D dddd'),
              from: moment(start).format('h:mm A'),
              to: moment(end || start).format('h:mm A')
            };
            scope.newEvent.start = start, //moment(start).format('DD MMM YYYY hh:mm a');
              scope.newEvent.end = end, //moment(end).format('DD MMM YYYY hh:mm a');
              scope.newEvent.allday = allDay;
          });
          calendar.fullCalendar('unselect');
        },
        eventSources: [
          {
            events: function (start, end, timezone, callback) {
              // console.log(scope.events);
              callback(scope.events);
            }
          }
          // ,
          // month
          ],
        // events: scope.events,
        // events: function(start, end, timezone, callback) {
        // 	// console.log(scope.events);
        // 	callback(scope.events);
        // },
        eventRender: function (event, element, icon) {
          // if (event.description) {
          //   element.find('.fc-title').append("<br/><span class='ultra-light'>" + event.description + "</span>");
          // }
          if (event.url) {
            element.find('.fc-day-grid-event').addClass('indigo')
            event.className.push('red')

          }

          if (event.icon !== "") {

            // <div my-tooltip-template="tooltiptmpl.html" my-tooltip-scope="prop">Some text...</div>
            element.find('.fc-title').append("<i class=' fc-icon-top-right " + event.icon + " '></i>");
          }
        }
      });

      $('.fc-header-right, .fc-header-center', $calendar).hide();


      var fscroll = $(".fc-scroller").height();
      $('.fc-scroller').height(fscroll).perfectScrollbar({
        suppressScrollX: true
      });

      var eve = $("#event-out").height();
      $('.events-side-navigation').height(eve).perfectScrollbar({
        suppressScrollX: true
      });


      $('#bdate').pickadate({
        container: 'body',
        onClose: function () {
          $(document.activeElement).blur()
        }
      });
      $('#input_starttime').pickatime({
        twelvehour: true,
        container: 'body'
      });
    }

    // Now events will be refetched every time events scope is updated in controller!!!
    scope.$watch("events", function (newValue, oldValue) {
      //$('#calendar').fullCalendar('addEventSource', month);
      $calendar.fullCalendar('refetchEvents');
    }, true);

    scope.$watch("slots", function (newValue, oldValue) {
       
      // var newArr = _.map(scope.slots, function(o) { return _.omit(o, '_id'); });
      // scope.slots =angular.copy(newArr);
      // console.log(scope.slots);
      if (newValue != oldValue) {
        $('#calendar').fullCalendar('destroy');
        initCalendar();
      }
    }, true);

    $timeout(function () {
      console.log(scope.slots);
      scope.slots = scope.slots;
      initCalendar();
    });

  };

  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'components/calendar/views/full-calendar.tpl.html',
    scope: {
      events: "=events",
      slots: "=slots"
    },
    controller: 'CalendarCtrl',
    link: lnk
  };
});
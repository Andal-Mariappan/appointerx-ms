"use strict";

angular.module('eventx').directive('fullCalendar', function ($log, $timeout, $compile) {

  var lnk = function (scope, element) {
    var $calendar = $("#calendar");
    var calendar = null;
    $('.event-collapse').sideNav({
      menuWidth: 450,
      edge: 'right'
    });

    $('.event-close-collapse').click(function () {
      $('.event-collapse').sideNav('hide');
    });

    (function () {
      var calConfig = [{
        "title": "Christian Holidays",
        "did": "ZW4uY2hyaXN0aWFuI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t",
        "creator": "en.christian#holiday@group.v.calendar.google.com"
      }, {
          "title": "Jewish Holidays",
          "did": "ZW4uanVkYWlzbSNob2xpZGF5QGdyb3VwLnYuY2FsZW5kYXIuZ29vZ2xlLmNvbQ",
          "creator": "en.judaism#holiday@group.v.calendar.google.com"
        }, {
          "title": "Muslim Holidays",
          "did": "ZW4uaXNsYW1pYyNob2xpZGF5QGdyb3VwLnYuY2FsZW5kYXIuZ29vZ2xlLmNvbQ",
          "creator": "en.islamic#holiday@group.v.calendar.google.com"
        }, {
          "title": "Orthodox Holidays",
          "did": "ZW4ub3J0aG9kb3hfY2hyaXN0aWFuaXR5I2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t",
          "creator": "en.orthodox_christianity#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Afghanistan",
          "did": "ZW4uYWYjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20",
          "creator": "en.af#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Albania",
          "did": "ZW4uYWwjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20",
          "creator": "en.al#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Algeria",
          "did": "ZW4uZHojaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20",
          "creator": "en.dz#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Andorra",
          "did": "ZW4uYWQjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20",
          "creator": "en.ad#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Angola",
          "did": "ZW4uYW8jaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20",
          "creator": "en.ao#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Argentina",
          "did": "ZW4uYXIjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20",
          "creator": "en.ar#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Armenia",
          "did": "ZW4uYW0jaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20",
          "creator": "en.am#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Aruba",
          "did": "ZW4uYXcjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20",
          "creator": "en.aw#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Australia",
          "did": "ZW4uYXVzdHJhbGlhbiNob2xpZGF5QGdyb3VwLnYuY2FsZW5kYXIuZ29vZ2xlLmNvbQ",
          "creator": "en.australian#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Austria",
          "did": "ZW4uYXVzdHJpYW4jaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20",
          "creator": "en.austrian#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Azerbaijan",
          "did": "ZW4uYXojaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20",
          "creator": "en.az#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Bahamas",
          "did": "ZW4uYnMjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20",
          "creator": "en.bs#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Bahrain",
          "did": "ZW4uYmgjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20",
          "creator": "en.bh#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Bangladesh",
          "did": "ZW4uYmQjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20",
          "creator": "en.bd#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Barbados",
          "did": "ZW4uYmIjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20",
          "creator": "en.bb#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Belarus",
          "did": "ZW4uYnkjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20",
          "creator": "en.by#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Belgium",
          "did": "ZW4uYmUjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20",
          "creator": "en.be#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Benin",
          "did": "ZW4uYmojaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20",
          "creator": "en.bj#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Bermuda",
          "did": "ZW4uYm0jaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20",
          "creator": "en.bm#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Bolivia",
          "did": "ZW4uYm8jaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20",
          "creator": "en.bo#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Bosnia and Herzegovina",
          "did": "ZW4uYmEjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20",
          "creator": "en.ba#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Botswana",
          "did": "ZW4uYncjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20",
          "creator": "en.bw#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Brazil",
          "did": "ZW4uYnJhemlsaWFuI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t",
          "creator": "en.brazilian#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Bulgaria",
          "did": "ZW4uYnVsZ2FyaWFuI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t",
          "creator": "en.bulgarian#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Burkina Faso",
          "did": "ZW4uYmYjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20",
          "creator": "en.bf#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Burundi",
          "did": "ZW4uYmkjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20",
          "creator": "en.bi#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Cambodia",
          "did": "ZW4ua2gjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20",
          "creator": "en.kh#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Cameroon",
          "did": "ZW4uY20jaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20",
          "creator": "en.cm#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Canada",
          "did": "ZW4uY2FuYWRpYW4jaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20",
          "creator": "en.canadian#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Cape Verde",
          "did": "ZW4uY3YjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20",
          "creator": "en.cv#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Cayman Islands",
          "did": "ZW4ua3kjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20",
          "creator": "en.ky#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Central African Republic",
          "did": "ZW4uY2YjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20",
          "creator": "en.cf#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Chad",
          "did": "ZW4udGQjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20",
          "creator": "en.td#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Chile",
          "did": "ZW4uY2wjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20",
          "creator": "en.cl#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in China",
          "did": "ZW4uY2hpbmEjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20",
          "creator": "en.china#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Colombia",
          "did": "ZW4uY28jaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20",
          "creator": "en.co#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Comoros",
          "did": "ZW4ua20jaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20",
          "creator": "en.km#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Congo",
          "did": "ZW4uY2cjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20",
          "creator": "en.cg#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Costa Rica",
          "did": "ZW4uY3IjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20",
          "creator": "en.cr#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Croatia",
          "did": "ZW4uY3JvYXRpYW4jaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20",
          "creator": "en.croatian#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Cuba",
          "did": "ZW4uY3UjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20",
          "creator": "en.cu#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Cyprus",
          "did": "ZW4uY3kjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20",
          "creator": "en.cy#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Czech Republic",
          "did": "ZW4uY3plY2gjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20",
          "creator": "en.czech#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in C\u00f4te d'Ivoire",
          "did": "ZW4uY2kjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20",
          "creator": "en.ci#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Democratic People's Republic of Korea",
          "did": "ZW4ua3AjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20",
          "creator": "en.kp#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Denmark",
          "did": "ZW4uZGFuaXNoI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t",
          "creator": "en.danish#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Dominican Republic",
          "did": "ZW4uZG8jaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20",
          "creator": "en.do#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Ecuador",
          "did": "ZW4uZWMjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20",
          "creator": "en.ec#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Egypt",
          "did": "ZW4uZWcjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20",
          "creator": "en.eg#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in El Salvador",
          "did": "ZW4uc3YjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20",
          "creator": "en.sv#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Equatorial Guinea",
          "did": "ZW4uZ3EjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20",
          "creator": "en.gq#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Eritrea",
          "did": "ZW4uZXIjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20",
          "creator": "en.er#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Estonia",
          "did": "ZW4uZWUjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20",
          "creator": "en.ee#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Ethiopia",
          "did": "ZW4uZXQjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20",
          "creator": "en.et#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Faroe Islands",
          "did": "ZW4uZm8jaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20",
          "creator": "en.fo#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Fiji",
          "did": "ZW4uZmojaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20",
          "creator": "en.fj#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Finland",
          "did": "ZW4uZmlubmlzaCNob2xpZGF5QGdyb3VwLnYuY2FsZW5kYXIuZ29vZ2xlLmNvbQ",
          "creator": "en.finnish#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in France",
          "did": "ZW4uZnJlbmNoI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t",
          "creator": "en.french#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Gabon",
          "did": "ZW4uZ2EjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20",
          "creator": "en.ga#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Gambia",
          "did": "ZW4uZ20jaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20",
          "creator": "en.gm#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Georgia",
          "did": "ZW4uZ2UjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20",
          "creator": "en.ge#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Germany",
          "did": "ZW4uZ2VybWFuI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t",
          "creator": "en.german#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Ghana",
          "did": "ZW4uZ2gjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20",
          "creator": "en.gh#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Gibraltar",
          "did": "ZW4uZ2kjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20",
          "creator": "en.gi#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Greece",
          "did": "ZW4uZ3JlZWsjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20",
          "creator": "en.greek#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Greenland",
          "did": "ZW4uZ2wjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20",
          "creator": "en.gl#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Grenada",
          "did": "ZW4uZ2QjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20",
          "creator": "en.gd#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Guatemala",
          "did": "ZW4uZ3QjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20",
          "creator": "en.gt#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Guinea",
          "did": "ZW4uZ24jaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20",
          "creator": "en.gn#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Guinea-Bissau",
          "did": "ZW4uZ3cjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20",
          "creator": "en.gw#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Haiti",
          "did": "ZW4uaHQjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20",
          "creator": "en.ht#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Holy See (Vatican City State)",
          "did": "ZW4udmEjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20",
          "creator": "en.va#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Honduras",
          "did": "ZW4uaG4jaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20",
          "creator": "en.hn#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Hong Kong",
          "did": "ZW4uaG9uZ19rb25nI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t",
          "creator": "en.hong_kong#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Hungary",
          "did": "ZW4uaHVuZ2FyaWFuI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t",
          "creator": "en.hungarian#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Iceland",
          "did": "ZW4uaXMjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20",
          "creator": "en.is#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in India",
          "did": "ZW4uaW5kaWFuI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t",
          "creator": "en.indian#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Indonesia",
          "did": "ZW4uaW5kb25lc2lhbiNob2xpZGF5QGdyb3VwLnYuY2FsZW5kYXIuZ29vZ2xlLmNvbQ",
          "creator": "en.indonesian#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Iraq",
          "did": "ZW4uaXEjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20",
          "creator": "en.iq#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Ireland",
          "did": "ZW4uaXJpc2gjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20",
          "creator": "en.irish#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Islamic Republic of Iran",
          "did": "ZW4uaXIjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20",
          "creator": "en.ir#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Israel",
          "did": "ZW4uamV3aXNoI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t",
          "creator": "en.jewish#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Italy",
          "did": "ZW4uaXRhbGlhbiNob2xpZGF5QGdyb3VwLnYuY2FsZW5kYXIuZ29vZ2xlLmNvbQ",
          "creator": "en.italian#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Jamaica",
          "did": "ZW4uam0jaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20",
          "creator": "en.jm#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Japan",
          "did": "ZW4uamFwYW5lc2UjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20",
          "creator": "en.japanese#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Jordan",
          "did": "ZW4uam8jaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20",
          "creator": "en.jo#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Kazakhstan",
          "did": "ZW4ua3ojaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20",
          "creator": "en.kz#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Kenya",
          "did": "ZW4ua2UjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20",
          "creator": "en.ke#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Kuwait",
          "did": "ZW4ua3cjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20",
          "creator": "en.kw#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Kyrgyzstan",
          "did": "ZW4ua2cjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20",
          "creator": "en.kg#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Latvia",
          "did": "ZW4ubGF0dmlhbiNob2xpZGF5QGdyb3VwLnYuY2FsZW5kYXIuZ29vZ2xlLmNvbQ",
          "creator": "en.latvian#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Lebanon",
          "did": "ZW4ubGIjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20",
          "creator": "en.lb#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Lesotho",
          "did": "ZW4ubHMjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20",
          "creator": "en.ls#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Liberia",
          "did": "ZW4ubHIjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20",
          "creator": "en.lr#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Libya",
          "did": "ZW4ubHkjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20",
          "creator": "en.ly#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Liechtenstein",
          "did": "ZW4ubGkjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20",
          "creator": "en.li#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Lithuania",
          "did": "ZW4ubGl0aHVhbmlhbiNob2xpZGF5QGdyb3VwLnYuY2FsZW5kYXIuZ29vZ2xlLmNvbQ",
          "creator": "en.lithuanian#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Luxembourg",
          "did": "ZW4ubHUjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20",
          "creator": "en.lu#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Madagascar",
          "did": "ZW4ubWcjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20",
          "creator": "en.mg#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Malawi",
          "did": "ZW4ubXcjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20",
          "creator": "en.mw#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Malaysia",
          "did": "ZW4ubWFsYXlzaWEjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20",
          "creator": "en.malaysia#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Mali",
          "did": "ZW4ubWwjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20",
          "creator": "en.ml#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Malta",
          "did": "ZW4ubXQjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20",
          "creator": "en.mt#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Martinique",
          "did": "ZW4ubXEjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20",
          "creator": "en.mq#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Mauritius",
          "did": "ZW4ubXUjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20",
          "creator": "en.mu#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Mayotte",
          "did": "ZW4ueXQjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20",
          "creator": "en.yt#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Mexico",
          "did": "ZW4ubWV4aWNhbiNob2xpZGF5QGdyb3VwLnYuY2FsZW5kYXIuZ29vZ2xlLmNvbQ",
          "creator": "en.mexican#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Moldova",
          "did": "ZW4ubWQjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20",
          "creator": "en.md#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Monaco",
          "did": "ZW4ubWMjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20",
          "creator": "en.mc#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Montenegro",
          "did": "ZW4ubWUjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20",
          "creator": "en.me#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Morocco",
          "did": "ZW4ubWEjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20",
          "creator": "en.ma#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Mozambique",
          "did": "ZW4ubXojaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20",
          "creator": "en.mz#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Namibia",
          "did": "ZW4ubmEjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20",
          "creator": "en.na#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Netherlands",
          "did": "ZW4uZHV0Y2gjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20",
          "creator": "en.dutch#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in New Zealand",
          "did": "ZW4ubmV3X3plYWxhbmQjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20",
          "creator": "en.new_zealand#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Nicaragua",
          "did": "ZW4ubmkjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20",
          "creator": "en.ni#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Niger",
          "did": "ZW4ubmUjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20",
          "creator": "en.ne#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Nigeria",
          "did": "ZW4ubmcjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20",
          "creator": "en.ng#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Norway",
          "did": "ZW4ubm9yd2VnaWFuI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t",
          "creator": "en.norwegian#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Oman",
          "did": "ZW4ub20jaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20",
          "creator": "en.om#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Pakistan",
          "did": "ZW4ucGsjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20",
          "creator": "en.pk#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Panama",
          "did": "ZW4ucGEjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20",
          "creator": "en.pa#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Paraguay",
          "did": "ZW4ucHkjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20",
          "creator": "en.py#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Peru",
          "did": "ZW4ucGUjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20",
          "creator": "en.pe#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Philippines",
          "did": "ZW4ucGhpbGlwcGluZXMjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20",
          "creator": "en.philippines#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Poland",
          "did": "ZW4ucG9saXNoI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t",
          "creator": "en.polish#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Portugal",
          "did": "ZW4ucG9ydHVndWVzZSNob2xpZGF5QGdyb3VwLnYuY2FsZW5kYXIuZ29vZ2xlLmNvbQ",
          "creator": "en.portuguese#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Puerto Rico",
          "did": "ZW4ucHIjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20",
          "creator": "en.pr#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Qatar",
          "did": "ZW4ucWEjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20",
          "creator": "en.qa#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Republic of Korea",
          "did": "ZW4uc291dGhfa29yZWEjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20",
          "creator": "en.south_korea#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Romania",
          "did": "ZW4ucm9tYW5pYW4jaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20",
          "creator": "en.romanian#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Russian Federation",
          "did": "ZW4ucnVzc2lhbiNob2xpZGF5QGdyb3VwLnYuY2FsZW5kYXIuZ29vZ2xlLmNvbQ",
          "creator": "en.russian#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Rwanda",
          "did": "ZW4ucncjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20",
          "creator": "en.rw#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in R\u00e9union",
          "did": "ZW4ucmUjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20",
          "creator": "en.re#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Saint Helena, Ascension and Tristan da Cunha",
          "did": "ZW4uc2gjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20",
          "creator": "en.sh#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in San Marino",
          "did": "ZW4uc20jaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20",
          "creator": "en.sm#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Sao Tome and Principe",
          "did": "ZW4uc3QjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20",
          "creator": "en.st#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Saudi Arabia",
          "did": "ZW4uc2F1ZGlhcmFiaWFuI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t",
          "creator": "en.saudiarabian#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Senegal",
          "did": "ZW4uc24jaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20",
          "creator": "en.sn#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Serbia",
          "did": "ZW4ucnMjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20",
          "creator": "en.rs#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Seychelles",
          "did": "ZW4uc2MjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20",
          "creator": "en.sc#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Sierra Leone",
          "did": "ZW4uc2wjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20",
          "creator": "en.sl#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Singapore",
          "did": "ZW4uc2luZ2Fwb3JlI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t",
          "creator": "en.singapore#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Slovakia",
          "did": "ZW4uc2xvdmFrI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t",
          "creator": "en.slovak#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Slovenia",
          "did": "ZW4uc2xvdmVuaWFuI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t",
          "creator": "en.slovenian#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Somalia",
          "did": "ZW4uc28jaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20",
          "creator": "en.so#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in South Africa",
          "did": "ZW4uc2EjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20",
          "creator": "en.sa#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in South Sudan",
          "did": "ZW4uc3MjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20",
          "creator": "en.ss#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Spain",
          "did": "ZW4uc3BhaW4jaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20",
          "creator": "en.spain#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Sri Lanka",
          "did": "ZW4ubGsjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20",
          "creator": "en.lk#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Sudan",
          "did": "ZW4uc2QjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20",
          "creator": "en.sd#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Suriname",
          "did": "ZW4uc3IjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20",
          "creator": "en.sr#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Swaziland",
          "did": "ZW4uc3ojaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20",
          "creator": "en.sz#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Sweden",
          "did": "ZW4uc3dlZGlzaCNob2xpZGF5QGdyb3VwLnYuY2FsZW5kYXIuZ29vZ2xlLmNvbQ",
          "creator": "en.swedish#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Switzerland",
          "did": "ZW4uY2gjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20",
          "creator": "en.ch#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Syrian Arab Republic",
          "did": "ZW4uc3kjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20",
          "creator": "en.sy#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Taiwan",
          "did": "ZW4udGFpd2FuI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t",
          "creator": "en.taiwan#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Thailand",
          "did": "ZW4udGgjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20",
          "creator": "en.th#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in The Democratic Republic of the Congo",
          "did": "ZW4uY2QjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20",
          "creator": "en.cd#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in The Former Yugoslav Republic of Macedonia",
          "did": "ZW4ubWsjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20",
          "creator": "en.mk#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Togo",
          "did": "ZW4udGcjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20",
          "creator": "en.tg#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Trinidad and Tobago",
          "did": "ZW4udHQjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20",
          "creator": "en.tt#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Tunisia",
          "did": "ZW4udG4jaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20",
          "creator": "en.tn#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Turkey",
          "did": "ZW4udHVya2lzaCNob2xpZGF5QGdyb3VwLnYuY2FsZW5kYXIuZ29vZ2xlLmNvbQ",
          "creator": "en.turkish#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in U.S. Virgin Islands",
          "did": "ZW4udmkjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20",
          "creator": "en.vi#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Uganda",
          "did": "ZW4udWcjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20",
          "creator": "en.ug#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Ukraine",
          "did": "ZW4udWtyYWluaWFuI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t",
          "creator": "en.ukrainian#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in United Arab Emirates",
          "did": "ZW4uYWUjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20",
          "creator": "en.ae#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in United Kingdom",
          "did": "ZW4udWsjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20",
          "creator": "en.uk#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in United Republic of Tanzania",
          "did": "ZW4udHojaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20",
          "creator": "en.tz#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in United States",
          "did": "ZW4udXNhI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t",
          "creator": "en.usa#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Uruguay",
          "did": "ZW4udXkjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20",
          "creator": "en.uy#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Venezuela",
          "did": "ZW4udmUjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20",
          "creator": "en.ve#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Vietnam",
          "did": "ZW4udmlldG5hbWVzZSNob2xpZGF5QGdyb3VwLnYuY2FsZW5kYXIuZ29vZ2xlLmNvbQ",
          "creator": "en.vietnamese#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Yemen",
          "did": "ZW4ueWUjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20",
          "creator": "en.ye#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Zambia",
          "did": "ZW4uem0jaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20",
          "creator": "en.zm#holiday@group.v.calendar.google.com"
        }, {
          "title": "Holidays in Zimbabwe",
          "did": "ZW4uencjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20",
          "creator": "en.zw#holiday@group.v.calendar.google.com"
        }];
      var select = document.getElementById('holidayCalendar');
      for (var i = 0; i < calConfig.length; i++) {
        var option = document.createElement('option');
        option.value = calConfig[i].creator;
        option.text = calConfig[i].title;
        select.appendChild(option);
      }
    })();
    $('#addSource').click(function () {
      var source = $('#holidayCalendar').val();
      //console.log(source);
      // $('#calendar').fullCalendar('removeEventSource', source);
      $('#calendar').fullCalendar('removeEvents' );
      $('#calendar').fullCalendar('addEventSource', source);
      $('#calendar').fullCalendar('rerenderEvents' );
    });

    $('#removeSource').click(function () {
      var source = $('#holidayCalendar').val();
      $('#calendar').fullCalendar('removeEventSource', source);
    });


      // scope.showHoliday=function()
      // {
      //   var source= "en.usa#holiday@group.v.calendar.google.com";
      //   if(scope.useHolidays)
      //   {
      //     $('#calendar').fullCalendar('addEventSource', source);
      //   }
      //   else
      //   {
      //     $('#calendar').fullCalendar('removeEventSource', source);
      //   }
      // }
    
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


    // var date = new Date();
    // var d = date.getDate();
    // var m = date.getMonth();
    // var y = date.getFullYear();

    // var monthSource = new Object();
    // monthSource.title = 'I am vacation'; // this should be string
    // monthSource.start = new Date(y, m, d, 9, 0); // this should be date object
    // monthSource.end = new Date(y, m, d + 2, 9, 30);
    // monthSource.className = 'red';
    // monthSource.isHoliday = true;

    // var month = new Array();
    // month[0] = monthSource;
    
    
    
    
    
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
        defaultView: 'agendaDay',
        eventClick: alertOnEventClick,
        selectConstraint: 'businessHours',
        eventConstraint: 'businessHours',
        firstDay: 1,
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
          if (event.description) {
            element.find('.fc-title').append("<br/><span class='ultra-light'>" + event.description + "</span>");
          }
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
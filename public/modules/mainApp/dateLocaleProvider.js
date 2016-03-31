
function dateLocaleProvider($mdDateLocaleProvider, moment) {
  $mdDateLocaleProvider.formatDate = function(date) {
    return moment(date).format('DD.MM.YYYY');
  };

  $mdDateLocaleProvider.parseDate = function(dateString) {
    var m = moment(dateString, 'DD.MM.YYYY', true);
    return m.isValid() ? m.toDate() : new Date(NaN);
  };
  
}

export default dateLocaleProvider;
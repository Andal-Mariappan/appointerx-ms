'use strict';

(function () {

    function ShiftsResource($resource) {
        return $resource('/api/settings/:id/:controller',
            {
                id: '@_id'
            },
            {
                'update': { method: 'PUT' },
                'byDocId': {
                    url: "/api/settings/doc/:docId",
                    method: 'GET',
                    params: {
                        docId: '@docId'
                    },
                    isArray: true
                },
                query: {
                    method: 'GET',
                    isArray: true
                }
            });
    }

    angular.module('eventx')
        .factory('Shifts', ShiftsResource);

})();
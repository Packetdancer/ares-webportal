import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { inject as service } from '@ember/service';
import ReloadableRoute from 'ares-webportal/mixins/reloadable-route';
import DefaultRoute from 'ares-webportal/mixins/default-route';

export default Route.extend(ReloadableRoute, DefaultRoute, {
    gameApi: service(),
        
    model: function(params) {
        let api = this.get('gameApi');
        return RSVP.hash({
            plot: api.requestOne('plot', { id: params['id'] }),
            sceneTypes: api.requestMany('sceneTypes') })
            .then((model) => Ember.Object.create(model));
    }
});

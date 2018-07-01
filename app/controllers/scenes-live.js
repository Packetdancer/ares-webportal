import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import AuthenticatedController from 'ares-webportal/mixins/authenticated-controller';

export default Controller.extend(AuthenticatedController, {
    gameApi: service(),
    gameSocket: service(),
    newActivity: false,
    
    onSceneActivity: function(msg) {
        this.send('reloadModel');
    },
    
    resetOnExit: function() {
        this.set('newActivity', false);
    },
    
    setupCallback: function() {
        let self = this;
        this.get('gameSocket').set('sceneCallback', function(data) {
            self.onSceneActivity(data) } );
    },
    
    actions: {
        
        refresh() {
            this.set('newActivity', false);
            this.send('reloadModel');
        }
    }
});
import {Subscription} from 'rxjs';
import {Component, OnDestroy} from '@angular/core';

@Component({
    selector: 'app-subscription-handler',
    template: ''
})
export class SubscriptionComponent implements OnDestroy {

    subscriptions: Subscription[];

    constructor() {
        this.subscriptions = [];
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }
}

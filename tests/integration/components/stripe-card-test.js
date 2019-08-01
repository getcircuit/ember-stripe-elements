import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { render } from '@ember/test-helpers';
import StripeMock from 'ember-stripe-elements/utils/stripe-mock';
import env from 'dummy/config/environment';
import StripeService from 'dummy/services/stripev3';

module('Integration | Component | stripe card', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    window.Stripe = StripeMock;
    const config = {
      mock: true,
      publishableKey: env.stripe.publishableKey,
    };

    this.owner.register(
      'service:stripev3',
      StripeService.create({ config }),
      { instantiate: false }
    );
  });

  test('it renders', async function(assert) {
    // Template block usage:
    await render(hbs`
      {{#stripe-card}}
        template block text
      {{/stripe-card}}
    `);

    assert.equal(this.element.textContent.trim(), 'template block text');
  });

  test('yields out error message', async function(assert) {
    this.stripeError = { message: 'oops' };
    await this.render(hbs`
      {{#stripe-card stripeError=stripeError as |stripeElement stripeError|}}
        {{stripeError.message}}
      {{/stripe-card}}
    `);

    assert.equal(this.element.textContent.trim(), 'oops');
  });
});

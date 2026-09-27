import { test } from 'node:test';
import { strict as assert } from 'node:assert';
import { replyTo } from '../lib/reception.mjs';
test('answers FAQ and flags urgent text', () => { const response = replyTo('Urgent: what are your opening hours?'); assert.equal(response.urgent, true); assert.match(response.answer, /Monday/); });

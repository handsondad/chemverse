import { describe, expect, it } from 'vitest';
import { html, raw } from '../src/learning/html';

describe('html template', () => {
  it('escapes interpolated text, including inside attributes', () => {
    const title = '<img src=x onerror="alert(1)">';
    expect(html`<a title="${title}">${title}</a>`.value).toBe(
      '<a title="&lt;img src=x onerror=&quot;alert(1)&quot;&gt;">&lt;img src=x onerror=&quot;alert(1)&quot;&gt;</a>',
    );
  });

  it('keeps nested templates and trusted markup, and joins lists', () => {
    const items = ['a&b', 'c'].map(item => html`<li>${item}</li>`);
    expect(html`<ul>${items}</ul>${raw('<hr>')}`.value).toBe('<ul><li>a&amp;b</li><li>c</li></ul><hr>');
  });

  it('drops source line breaks but keeps inline spaces, booleans and numbers', () => {
    const markup = html`
      <button aria-pressed="${false}">
        ${3} 节课程 ${null}${undefined}
      </button>`;
    expect(markup.value).toBe('<button aria-pressed="false">3 节课程 </button>');
  });
});

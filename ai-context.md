---
liquid: false
---

# AI guidelines for GOV.UK Prototype Kit

> This file provides context for AI assistants (Claude, Cursor, Copilot, etc.) working on this prototype.
> It should be read automatically when the AI accesses the repository.

---

## How to use this file

This file helps AI assistants generate correct, accessible, GOV.UK-compliant code for your prototype. Here's how to get the most from it:

### Automatic loading

Most AI-enabled editors (Cursor, Windsurf, Cline) will automatically detect and use `ai-context.md`
in your project root. For Claude Projects, add it to the project knowledge. If using GitHub Copilot or
Claude Code within an IDE like Visual Studio Code, use the following recommended prompts.

### Recommended prompts

When starting work, ask your AI assistant to confirm it has this context:

> "Have you read the ai-context.md file? Confirm you understand the GOV.UK Prototype Kit conventions before we start."

For specific tasks, reference the guidelines directly:

> "Following the content design principles in ai-context.md, write the error messages for this form."
> "Create a new question page for collecting date of birth, using the conventions documented in ai-context.md."
> "Review this page against the accessibility checklist in ai-context.md."

### Tips for better results

- **Be specific about versions** – mention which prototype version you're working in (e.g. "in `/v3/`")
- **Reference patterns** – point to existing pages that do something similar
- **Ask for constraints first** – get the AI to confirm what it can't do with GOV.UK components before generating code
- **Request macro syntax** – always ask for Nunjucks macros, not raw HTML

---

## Sections overview

| Section                                                 | What it covers                                                   |
| ------------------------------------------------------- | ---------------------------------------------------------------- |
| [Project context](#project-context)                     | Tech stack and framework versions                                |
| [Core rules](#core-rules)                               | The five non-negotiable rules for this codebase                  |
| [File structure](#file-structure)                       | Directory layout, versioning, and naming conventions             |
| [Content design principles](#content-design-principles) | Plain English, tone, capitalisation, and GOV.UK style            |
| [Code style](#code-style)                               | Formatting, indentation, and general coding principles           |
| [Accessibility guidelines](#accessibility-guidelines)   | WCAG 2.2 AA compliance and checklist                             |
| [Creating pages](#creating-pages)                       | Page templates and structure                                     |
| [Design System reference](#design-system-reference)     | Links to live documentation for components, styles, and patterns |
| [Routes and branching](#routes-and-branching)           | Express routing and form logic                                   |
| [Reference links](#reference-links)                     | Official documentation                                           |
| [Suggestions and updates](#suggestions-and-updates)     | How to contribute improvements                                   |

---

## Project context

This is a GOV.UK Prototype Kit project using:

- **GOV.UK Prototype Kit** (v13+)
- **GOV.UK Frontend** (govuk-frontend)
- **Nunjucks** templating
- **GOV.UK Design System** components and patterns

## Core rules

1. **All pages must extend the layout template** – use `{% extends "layouts/main.html" %}`
2. **Use Nunjucks macros** – prefer `{{ govukButton({...}) }}` over raw HTML
3. **Only use existing GOV.UK classes** – no custom CSS or inline styles
4. **Accessibility is built-in** – components are WCAG 2.2 AA compliant by design
5. **Flag gaps** – if something isn't possible with existing components, say so

---

## File structure

```txt
app/
├── views/
│   ├── layouts/
│   │   └── main.html               # Base layout – don't modify unless necessary
│   ├── includes/                   # Reusable partials
│   │   ├── _header.html
│   │   └── _footer.html
│   ├── index.html                  # Lists all prototype versions
│   ├── v1/                         # Version 1
│   │   ├── index.html              # Version overview/notes (optional)
│   │   ├── start.html
│   │   ├── question-1.html
│   │   ├── question-2.html
│   │   ├── check-answers.html
│   │   └── confirmation.html
│   ├── v2/                         # Version 2
│   │   ├── index.html
│   │   ├── start.html
│   │   ├── question-1.html
│   │   ├── question-1b.html        # New page added in v2
│   │   └── ...
│   └── v3/                         # Current working version
│       └── ...
├── assets/
│   ├── sass/                       # Custom styles (use sparingly)
│   ├── javascript/                 # Custom JS
│   └── images/
├── routes.js                       # Express routes and branching logic
└── data/
    └── session-data-defaults.js    # Default form values
```

### Versioning principles

1. **Never delete old versions** – keep them for reference and comparison
2. **Copy, don't move** – when starting a new version, copy the previous folder
3. **Document changes** – update the main index.html with what changed and why
4. **Use descriptive version notes** – "Added address lookup" not "Updates"
5. **Keep routes separate** – each version should have its own route paths

### Main index page (app/views/index.html)

The root index.html should list all prototype versions with metadata showing dates, phase, and research status. Here is a suggested layout:

```nunjucks
{% extends "layouts/main.html" %}

{% set pageName = "Prototype versions" %}

{% block content %}
  <div class="govuk-grid-row">
    <div class="govuk-grid-column-two-thirds">
      <h1 class="govuk-heading-xl">{{ serviceName }}</h1>

      {{ govukInsetText({
        text: "This is a prototype for user research. It is not a real service."
      }) }}

      <h2 class="govuk-heading-l">Prototype versions</h2>

      <h3 class="govuk-heading-m"><a href="/v3/" class="govuk-link">Version 3</a></h3>
      <p class="govuk-!-margin-bottom-2">
        {{ govukTag({ text: "February 2026", classes: "govuk-tag--grey govuk-!-margin-right-1" }) }}
        {{ govukTag({ text: "Alpha", classes: "govuk-!-margin-right-1" }) }}
        {{ govukTag({ text: "Changes from R1", classes: "govuk-tag--green govuk-!-margin-right-1" }) }}
        {{ govukTag({ text: "Tested in R2", classes: "govuk-tag--yellow" }) }}
      </p>
      <p class="govuk-hint">Iteration based on recommendations from first round of UR. Tested in a second round of UR.</p>

      <hr class="govuk-section-break govuk-section-break--l govuk-section-break--visible">

      <h3 class="govuk-heading-m"><a href="/v2/" class="govuk-link">Version 2</a></h3>
      <p class="govuk-!-margin-bottom-2">
        {{ govukTag({ text: "February 2026", classes: "govuk-tag--grey govuk-!-margin-right-1" }) }}
        {{ govukTag({ text: "Alpha", classes: "govuk-!-margin-right-1" }) }}
        {{ govukTag({ text: "Tested in R1", classes: "govuk-tag--yellow" }) }}
      </p>
      <p class="govuk-hint">Iteration based on internal review and crit. Tested in a first round of UR.</p>

      <hr class="govuk-section-break govuk-section-break--l govuk-section-break--visible">

      <h3 class="govuk-heading-m"><a href="/v1/" class="govuk-link">Version 1</a></h3>
      <p class="govuk-!-margin-bottom-2">
        {{ govukTag({ text: "January 2026", classes: "govuk-tag--grey govuk-!-margin-right-1" }) }}
        {{ govukTag({ text: "Alpha" }) }}
      </p>
      <p class="govuk-hint">Initial prototype.</p>

    </div>
  </div>
{% endblock %}
```

#### Suggested tag conventions for version metadata

| Tag colour     | Use for                                           |
| -------------- | ------------------------------------------------- |
| Grey           | Date (month and year)                             |
| Blue (default) | Phase (Discovery, Alpha, Beta)                    |
| Green          | Recommendations implemented from a research round |
| Yellow         | Tested in a research round                        |

Keep descriptions concise – one line explaining what changed or was tested.

### Version-specific index (optional)

Each version folder can have its own index.html for version-specific notes. Here is a suggested layout:

```nunjucks
{% extends "layouts/main.html" %}

{% set pageName = "Version 2" %}

{% block content %}
  <div class="govuk-grid-row">
    <div class="govuk-grid-column-two-thirds">

      <span class="govuk-caption-l">{{ serviceName }}</span>
      <h1 class="govuk-heading-l govuk-!-margin-bottom-2">Version 2</h1>

      <p class="govuk-!-margin-bottom-7">
        {{ govukTag({ text: "February 2026", classes: "govuk-tag--grey govuk-!-margin-right-1" }) }}
        {{ govukTag({ text: "Alpha", classes: "govuk-!-margin-right-1" }) }}
        {{ govukTag({ text: "Tested in R1", classes: "govuk-tag--yellow" }) }}
      </p>

      <div class="govuk-button-group">
        {{ govukButton({ text: "View prototype", href: "/v2/start" }) }}
      </div>

      <h2 class="govuk-heading-m">Changes in this version</h2>
      <ul class="govuk-list govuk-list--bullet">
        <li>Added address lookup (postcode search)</li>
        <li>Split eligibility into two questions</li>
        <li>Removed "other" option from contact preference</li>
      </ul>

      <h2 class="govuk-heading-m">Research notes</h2>
      <p class="govuk-body">Tested with 5 users on 15 March 2024.</p>

    </div>
  </div>
{% endblock %}
```

### Naming conventions

| Type               | Convention               | Example                      |
| ------------------ | ------------------------ | ---------------------------- |
| HTML files         | Lowercase, hyphens       | `check-answers.html`         |
| URL paths          | Lowercase, hyphens       | `/v2/check-answers`          |
| Form field names   | Lowercase, hyphens       | `full-name`, `date-of-birth` |
| CSS classes        | BEM with `govuk-` prefix | `govuk-form-group--error`    |
| JS variables       | camelCase                | `contactMethod`, `hasErrors` |
| Nunjucks variables | camelCase                | `pageName`, `serviceName`    |

---

## Content design principles

GOV.UK content follows strict guidelines. Apply these when writing any user-facing text.

### Plain English

Plain English is mandatory. Even specialist or technical content must be clear.

| Instead of    | Use    |
| ------------- | ------ |
| purchase      | buy    |
| assist        | help   |
| approximately | about  |
| commence      | start  |
| regarding     | about  |
| prior to      | before |
| in order to   | to     |
| utilise       | use    |
| terminate     | end    |
| subsequently  | then   |
| facilitate    | help   |
| in respect of | about  |
| persons       | people |

### Tone and voice

- Write like you're talking to the user one-to-one
- Address the user as "you"
- Refer to the service as "we"
- Be direct and confident, not formal or stuffy

```nunjucks
{# ✓ Correct: Direct, conversational #}
<p class="govuk-body">You'll need to provide your passport number.</p>
<p class="govuk-body">We'll send you a confirmation email.</p>

{# ✗ Avoid: Formal, impersonal #}
<p class="govuk-body">Applicants are required to provide their passport number.</p>
<p class="govuk-body">A confirmation email will be dispatched to the user.</p>
```

### Capitalisation

Use sentence case for everything except proper nouns.

```nunjucks
{# ✓ Correct: Sentence case #}
<h1 class="govuk-heading-l">Apply for a driving licence</h1>
<label class="govuk-label">National Insurance number</label>
{{ govukButton({ text: "Continue" }) }}

{# ✗ Avoid: Title case #}
<h1 class="govuk-heading-l">Apply For A Driving Licence</h1>
<label class="govuk-label">National Insurance Number</label>
{{ govukButton({ text: "Continue Application" }) }}
```

### Headings and labels

- Front-load with keywords (put important words first)
- Keep them short and specific
- Use verbs for actions ("Apply for...", "Check your...")
- Questions work well for form pages ("What is your name?")

```nunjucks
{# ✓ Correct: Clear, front-loaded #}
<h1 class="govuk-heading-l">What is your date of birth?</h1>
<h1 class="govuk-heading-l">Upload your photo</h1>

{# ✗ Avoid: Vague, buried keywords #}
<h1 class="govuk-heading-l">Personal information entry form</h1>
<h1 class="govuk-heading-l">Documents and supporting evidence</h1>
```

### Button text

- Use verbs that describe the action
- Be specific about what happens next
- "Continue" for most multi-page forms
- "Submit" or "Send application" for final submission
- Don't use "Click here" or "Next"

| Context                 | Button text              |
| ----------------------- | ------------------------ |
| Moving to next question | Continue                 |
| Final submission        | Send application         |
| Saving progress         | Save and come back later |
| Starting a service      | Start now                |
| Adding another item     | Add another address      |
| Confirming a choice     | Confirm and continue     |

### Error messages

Form validation is not usually required in prototypes. However, if it is, error messages must:

- Say what went wrong
- Tell the user how to fix it
- Use the same words as the label

```nunjucks
{# ✓ Correct: Specific, actionable #}
{{ govukInput({
  label: { text: "Email address" },
  errorMessage: { text: "Enter an email address in the correct format, like name@example.com" }
}) }}

{{ govukDateInput({
  errorMessage: { text: "Date of birth must include a year" }
}) }}

{# ✗ Avoid: Vague, unhelpful #}
{{ govukInput({
  label: { text: "Email address" },
  errorMessage: { text: "Invalid input" }
}) }}

{{ govukDateInput({
  errorMessage: { text: "Error: validation failed" }
}) }}
```

### Hint text

- Explain what to enter, not why you're asking
- Give examples in the format you expect
- Keep it short

```nunjucks
{# ✓ Correct: Helpful, specific #}
{{ govukInput({
  label: { text: "National Insurance number" },
  hint: { text: "It's on your National Insurance card. For example, 'QQ 12 34 56 C'." }
}) }}

{# ✗ Avoid: Unnecessary explanation #}
{{ govukInput({
  label: { text: "National Insurance number" },
  hint: { text: "We need this to verify your identity and check your eligibility for this service." }
}) }}
```

### Words and phrases to avoid

| Avoid                           | Why                                      |
| ------------------------------- | ---------------------------------------- |
| Please                          | Unnecessary padding                      |
| Please note                     | Just say it                              |
| Thank you for...                | Sycophantic                              |
| Click                           | Not everyone uses a mouse (use "select") |
| As part of our commitment to... | Corporate waffle                         |
| Going forward                   | Just say "from now" or nothing           |
| Key (as adjective)              | Use "important" or remove                |
| Ensure                          | Use "make sure"                          |
| Via                             | Use "through" or "by"                    |
| I.e. / e.g.                     | Use "that is" / "for example"            |

### Numbers and dates

- Write numbers 1 to 9 as words, 10+ as digits
- Use "to" not dashes for ranges ("9am to 5pm")
- Dates: "6 September 2024" (no ordinals like "6th")
- Money: "£50", "£75.50" (no ".00")
- Percentages: "50%" not "50 per cent"

---

## Code style

### Indentation and formatting

| Language      | Indentation | Notes                           |
| ------------- | ----------- | ------------------------------- |
| Nunjucks/HTML | 2 spaces    | Standard for GOV.UK projects    |
| JavaScript    | 2 spaces    | Match Prototype Kit conventions |
| Sass/CSS      | 2 spaces    | Match govuk-frontend            |
| JSON          | 2 spaces    | For config files                |

**Do not use tabs.** The Prototype Kit and govuk-frontend use spaces throughout.

### Nunjucks formatting

```nunjucks
{# ✓ Correct: Multi-line macro with aligned properties #}
{{ govukInput({
  label: {
    text: "Full name",
    classes: "govuk-label--l",
    isPageHeading: true
  },
  id: "full-name",
  name: "fullName",
  value: data['fullName'],
  errorMessage: errors['fullName']
}) }}

{# ✗ Avoid: Single line for complex macros #}
{{ govukInput({ label: { text: "Full name", classes: "govuk-label--l", isPageHeading: true }, id: "full-name", name: "fullName" }) }}

{# ✓ Correct: Simple macros can be single line #}
{{ govukButton({ text: "Continue" }) }}
{{ govukTag({ text: "Draft", classes: "govuk-tag--grey" }) }}
```

### HTML structure

```html
<!-- ✓ Correct: Proper nesting and indentation -->
<div class="govuk-grid-row">
  <div class="govuk-grid-column-two-thirds">
    <h1 class="govuk-heading-l">Page title</h1>
    <p class="govuk-body">
      Paragraph text that might be quite long and wrap across multiple lines in
      the source.
    </p>
  </div>
</div>
```

### Class ordering

Apply classes in this order:

1. Component class (`govuk-button`)
2. Component modifier (`govuk-button--secondary`)
3. Width/sizing (`govuk-!-width-two-thirds`)
4. Spacing (`govuk-!-margin-bottom-6`)
5. Display (`govuk-!-display-none`)

```html
<!-- ✓ Correct order -->
<input
  class="govuk-input govuk-input--error govuk-!-width-one-half govuk-!-margin-bottom-4"
/>

<!-- ✗ Avoid: Random order -->
<input
  class="govuk-!-margin-bottom-4 govuk-input govuk-!-width-one-half govuk-input--error"
/>
```

### JavaScript (routes.js)

```javascript
// ✓ Correct: Clear routing with consistent style
router.post("/v2/contact-method", function (request, response) {
  const contactMethod = request.session.data["contact-method"];

  if (contactMethod === "email") {
    response.redirect("/v2/email-address");
  } else {
    response.redirect("/v2/phone-number");
  }
});

// ✓ Use const for variables that don't change
const name = request.session.data["full-name"];
```

### Form field naming

```nunjucks
{# ✓ Correct: Consistent hyphenated names #}
{{ govukInput({ name: "full-name", id: "full-name" }) }}
{{ govukInput({ name: "email-address", id: "email-address" }) }}
{{ govukDateInput({ namePrefix: "date-of-birth" }) }}

{# ✗ Avoid: Inconsistent naming styles #}
{{ govukInput({ name: "fullName", id: "full-name" }) }}
{{ govukInput({ name: "email_address", id: "emailAddress" }) }}
```

### Comments

```nunjucks
{# Nunjucks comments for template logic #}
{# This section only shows if user selected 'yes' #}
{% if data['has-partner'] === 'yes' %}
  ...
{% endif %}

<!-- HTML comments for structural notes (visible in source) -->
<!-- Check answers section -->
```

```javascript
// JavaScript: Use // for single lines
// Redirect based on user's answer

/*
 * Use block comments for complex logic explanations
 * that span multiple lines
 */
```

### General principles

1. **Keep templates simple** – complex logic belongs in `routes.js`, not templates
2. **One question per page** – don't combine multiple questions
3. **Match existing patterns** – look at similar pages in the codebase first
4. **Don't repeat yourself** – use includes for repeated content
5. **Test with real content** – avoid lorem ipsum, use realistic data
6. **Preserve data references** – keep `data['field-name']` access consistent

---

## Accessibility guidelines

GOV.UK components are WCAG 2.2 AA compliant by default, but you must use them correctly. These guidelines are mandatory.

### Labels and inputs

Every form input must have an associated label. Never use placeholder text as a substitute for labels.

```nunjucks
{# ✓ Correct: Label associated via 'for' attribute (handled by macro) #}
{{ govukInput({
  label: { text: "Email address" },
  id: "email",
  name: "email"
}) }}

{# ✗ Never: Input without label #}
<input class="govuk-input" type="text" name="email">

{# ✗ Never: Placeholder as label #}
<input class="govuk-input" type="text" placeholder="Enter email">
```

### Hint texts

Use `hint` for help text. It's automatically linked to the input via `aria-describedby`.

```nunjucks
{{ govukInput({
  label: { text: "National Insurance number" },
  hint: { text: "It's on your National Insurance card. For example, 'QQ 12 34 56 C'." },
  id: "ni-number",
  name: "ni-number"
}) }}
```

### Fieldsets and legends

Group related inputs (radios, checkboxes, date inputs) with a fieldset. The legend describes the group.

```nunjucks
{# ✓ Correct: Fieldset with legend for grouped inputs #}
{{ govukRadios({
  name: "contact",
  fieldset: {
    legend: {
      text: "How would you prefer to be contacted?",
      isPageHeading: true,
      classes: "govuk-fieldset__legend--l"
    }
  },
  items: [...]
}) }}

{# ✗ Avoid: Radios without fieldset/legend #}
<label>Email</label>
<input type="radio" name="contact" value="email">
<label>Phone</label>
<input type="radio" name="contact" value="phone">
```

### Link text

Link text must describe the destination. Avoid generic text like "click here" or "read more".

```nunjucks
{# ✓ Correct: Descriptive link text #}
<a href="/apply" class="govuk-link">Apply for a driving licence</a>

{# ✗ Avoid: Generic link text #}
<a href="/apply" class="govuk-link">Click here</a>
To apply for a driving licence, <a href="/apply" class="govuk-link">read more</a>.
```

When context makes the destination clear visually but not for screen readers, use visually hidden text:

```nunjucks
{# ✓ Correct: Hidden text for screen reader context #}
{{ govukSummaryList({
  rows: [{
    key: { text: "Name" },
    value: { text: "Sarah Smith" },
    actions: {
      items: [{
        href: "/change-name",
        text: "Change",
        visuallyHiddenText: "name"
      }]
    }
  }]
}) }}

{# Renders as: "Change <span class="govuk-visually-hidden">name</span>" #}
{# Screen reader announces: "Change name" #}

{# For manual implementation: #}
<a href="/change-name" class="govuk-link">
  Change<span class="govuk-visually-hidden"> name</span>
</a>
```

### Heading hierarchy

Use headings in order. Don't skip levels. Every page needs one `<h1>`.

```nunjucks
{# ✓ Correct: Sequential heading levels #}
<h1 class="govuk-heading-l">Apply for a licence</h1>
<h2 class="govuk-heading-m">Before you start</h2>
<p class="govuk-body">...</p>
<h2 class="govuk-heading-m">What you'll need</h2>
<h3 class="govuk-heading-s">Documents</h3>

{# ✗ Avoid: Skipping levels or multiple h1s #}
<h1 class="govuk-heading-l">Apply for a licence</h1>
<h3 class="govuk-heading-s">Before you start</h3>  {# Skipped h2 #}
<h1 class="govuk-heading-l">Another section</h1>   {# Multiple h1s #}
```

Use `isPageHeading: true` to make a legend or label the page's `<h1>`:

```nunjucks
{{ govukInput({
  label: {
    text: "What is your email address?",
    classes: "govuk-label--l",
    isPageHeading: true
  },
  id: "email",
  name: "email"
}) }}
```

### Error message

Errors must be:

1. Linked to the input via `aria-describedby` (macros handle this)
2. Summarised at the top of the page with links to each field
3. Prefixed with visually hidden "Error:" text (macros handle this)

```nunjucks
{# Error summary at page top - links to each field #}
{{ govukErrorSummary({
  titleText: "There is a problem",
  errorList: [
    { text: "Enter your full name", href: "#full-name" },
    { text: "Enter a valid email address", href: "#email" }
  ]
}) }}

{# Individual field errors #}
{{ govukInput({
  label: { text: "Full name" },
  id: "full-name",
  name: "full-name",
  errorMessage: { text: "Enter your full name" }
}) }}
```

### Focus states

Never remove or override focus styles. GOV.UK uses a yellow focus ring for visibility.

```css
/* ✗ Never do this */
*:focus {
  outline: none;
}

.govuk-link:focus {
  outline: none;
}
```

### Images

All images need appropriate `alt` text. Decorative images should have empty alt (`alt=""`).

```nunjucks
{# Informative image: describe the content #}
<img src="/images/passport-example.jpg" alt="Photo page of a UK passport showing where to find the passport number" class="govuk-!-margin-bottom-4">

{# Decorative image: empty alt #}
<img src="/images/decoration.png" alt="">

{# Complex images: use longer description #}
<figure>
  <img src="/images/chart.png" alt="Bar chart showing application numbers by month, described in the following table">
  <figcaption class="govuk-body-s">Figure 1: Monthly applications</figcaption>
</figure>
```

### Tables

Tables must have headers that describe columns/rows.

```nunjucks
{{ govukTable({
  caption: "Monthly application statistics",
  captionClasses: "govuk-table__caption--m",
  firstCellIsHeader: true,
  head: [
    { text: "Month" },
    { text: "Applications" },
    { text: "Approved" }
  ],
  rows: [
    [{ text: "January" }, { text: "245" }, { text: "230" }],
    [{ text: "February" }, { text: "312" }, { text: "298" }]
  ]
}) }}
```

### Buttons vs links

Use the correct element for the action:

| Element                    | Use for                        |
| -------------------------- | ------------------------------ |
| `<button>` / `govukButton` | Actions (submit, save, delete) |
| `<a>` / `govuk-link`       | Navigation to another page     |

```nunjucks
{# ✓ Correct: Button for form submission #}
{{ govukButton({ text: "Submit application" }) }}

{# ✓ Correct: Link for navigation #}
<a href="/dashboard" class="govuk-link">Return to dashboard</a>

{# ✗ Avoid: Link styled as button for actions #}
<a href="#" class="govuk-button">Submit</a>

{# Exception: Start button is a link (navigates to service) #}
{{ govukButton({ text: "Start now", href: "/first-question", isStartButton: true }) }}
```

### Language

If content is in a different language, mark it:

```html
<p class="govuk-body">
  The French term is <span lang="fr">carte d'identité</span>.
</p>
```

### Accessibility checklist

Before considering a page complete:

- [ ] Single `<h1>` that describes the page
- [ ] Headings in sequential order (no skipped levels)
- [ ] All form inputs have visible labels
- [ ] All form inputs have associated `<label>` elements
- [ ] Error summary present and links to fields
- [ ] Link text describes destination
- [ ] Visually hidden text added where context needed
- [ ] Images have appropriate alt text
- [ ] No removal of focus styles
- [ ] Buttons used for actions, links for navigation

---

## Creating pages

### Use Prototype Kit templates

Templates are available to copy from **node_modules/@govuk-prototype-kit/common-templates/templates**:

| Template           | Use for                              |
| ------------------ | ------------------------------------ |
| Blank page         | Blank GOV.UK template                |
| Unbranded page     | Blank unbranded template             |
| Check your answers | Summary before submission            |
| Confirmation page  | Success page after submission        |
| Content page       | Information/guidance pages           |
| Question page      | Single question with continue button |
| Start page         | Service entry point                  |
| Task list          | Multi-section forms                  |

### Basic page structure

```nunjucks
{% extends "layouts/main.html" %}

{% set pageName = "What is your name?" %}

{% block beforeContent %}
  {{ govukBackLink({
    text: "Back",
    href: "javascript:history.back()"
  }) }}
{% endblock %}

{% block content %}
  <div class="govuk-grid-row">
    <div class="govuk-grid-column-two-thirds">
      <!-- Content here -->
    </div>
  </div>
{% endblock %}
```

### Available blocks

| Block           | Purpose                                     |
| --------------- | ------------------------------------------- |
| `content`       | Main page content                           |
| `beforeContent` | Back links, breadcrumbs, phase banner       |
| `pageTitle`     | Browser tab title (auto-set via `pageName`) |
| `header`        | Override header                             |
| `footer`        | Override footer                             |

### Linking to pages not yet built

When a prototype includes links to pages that haven't been created yet (e.g. header navigation,
footer links, or features outside the current testing scope), link them to a shared placeholder page at `/not-yet-built`.

Create `app/views/not-yet-built.html`:

```nunjucks
{% extends "layouts/main.html" %}

{% set pageName = "Page not built yet" %}

{% block beforeContent %}
  {{ govukBackLink({
    text: "Back",
    href: "javascript:history.back()"
  }) }}
{% endblock %}

{% block content %}
  <div class="govuk-grid-row">
    <div class="govuk-grid-column-two-thirds">
      <h1 class="govuk-heading-l">This page has not been built yet</h1>

      <p class="govuk-body">This part of the prototype is not ready for testing.</p>

      <p class="govuk-body">
        <a href="javascript:history.back()" class="govuk-link">Go back to the previous page</a>
      </p>
    </div>
  </div>
{% endblock %}
```

Then link to it from any placeholder navigation:

```nunjucks
<a href="/not-yet-built" class="govuk-link">Account settings</a>
```

---

## Design System reference

For component syntax, CSS classes, spacing, typography, and colours, always refer to the live documentation:

- **Components** (Nunjucks macros): <https://design-system.service.gov.uk/components/>
- **Patterns** (common user journeys): <https://design-system.service.gov.uk/patterns/>
- **Styles** (layout, spacing, typography, colours): <https://design-system.service.gov.uk/styles/>

Do not hardcode class names or hex values from memory – check the current documentation to ensure accuracy.

---

## Routes and branching

### Basic route (routes.js)

```javascript
router.post("/v2/question-answer", function (request, response) {
  response.redirect("/v2/next-page");
});
```

### Branching logic

```javascript
router.post("/v2/contact-preference", function (request, response) {
  const contact = request.session.data["contact"];

  if (contact === "email") {
    response.redirect("/v2/email-address");
  } else if (contact === "phone") {
    response.redirect("/v2/phone-number");
  } else {
    response.redirect("/v2/postal-address");
  }
});
```

### Accessing data in templates

```nunjucks
{# Display stored answer #}
<p>{{ data['fullName'] }}</p>

{# With default value #}
<p>{{ data['fullName'] or 'Not provided' }}</p>

{# Pre-fill form field #}
{{ govukInput({
  value: data['fullName']
}) }}
```

### Setting variable within a view

```nunjucks
{% set fullName = "Joe Blogs" %}
```

---

## Reference links

- GOV.UK Prototype Kit: <https://prototype-kit.service.gov.uk/docs>
- Create pages from templates: <https://prototype-kit.service.gov.uk/docs/create-pages-from-templates>
- Design System: <https://design-system.service.gov.uk>
- Components: <https://design-system.service.gov.uk/components/>
- Patterns: <https://design-system.service.gov.uk/patterns/>
- Styles: <https://design-system.service.gov.uk/styles/>
- GOV.UK style guide: <https://www.gov.uk/guidance/style-guide/a-to-z>

---

## Suggestions and updates

Have ideas for improving this file? Found something missing or incorrect?

**Contact:** Ben Fraser  
**Email:** <ben.fraser@justice.gov.uk>  
**Slack:** x-Gov Slack, [Ben Fraser (MoJ)](https://ukgovernmentdigital.slack.com/team/U09B140MVCK)

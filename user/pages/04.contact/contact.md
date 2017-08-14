---
title: Contact
content:
    items: '@self.modular'
    order:
        by: default
        dir: asc
        custom:
            - _info
            - _contact
    pagination: '1'
    url_taxonomy_filters: '1'
form:
    name: contact-form
    action: /contact
    fields:
        -
            name: name
            id: name
            label: Name
            classes: 'form-control form-control-lg'
            placeholder: 'Your name'
            autocomplete: 'on'
            type: text
            validate:
                required: true
        -
            name: email
            id: email
            classes: 'form-control form-control-lg'
            label: 'Email address'
            placeholder: 'Your email address'
            type: email
            validate:
                rule: email
                required: true
        -
            name: soundcloud_link
            id: soundcloud_link
            classes: 'form-control form-control-lg'
            label: 'Soundcloud Link'
            placeholder: 'Link to your track on soundcloud'
            type: text
            validate:
                required: true
        -
            name: message
            label: Message
            classes: 'form-control form-control-lg'
            size: long
            placeholder: 'Your message'
            type: textarea
            validate:
                required: true
    buttons:
        -
            type: submit
            value: Send
            classes: 'btn btn-ghost btn-block'
    process:
        -
            email:
                from: '{{ config.plugins.email.from }}'
                to: ['{{ config.plugins.email.from }}', '{{ form.value.email }}']
                subject: '[Feedback] {{ form.value.name|e }}'
                body: '{% include ''forms/data.html.twig'' %}'
        -
            save:
                fileprefix: feedback-
                dateformat: Ymd-His-u
                extension: txt
                body: '{% include ''forms/data.txt.twig'' %}'
        -
            message: 'Thank you, your message has been sent!'
---


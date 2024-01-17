const editor = grapesjs.init({
    container: '#gjs',
    fromElement: true,
    height:'600px',
    width: 'auto',
    storageManager: false,
    panels: {defaults:[]},

    blockManager: {
        appendTo: '#blocks',
        blocks: [
          {
            id: 'section',
            label: `<b>section</b>`,
            content: `<section>
               <h1>Heading</h1>
            </section>`
          },    
          {
            id: 'text',
            label: 'text',
            content: `<section>
            <p>paragraph</p>
            </section>`
          },
          {
            id: 'images',
            label: 'images',
            select: true,
            content: {type : 'image'}
          },
          {
            id: 'modal',
            label: 'modal',
            content: `
            <div class="spinner-border text-muted"></div>
            `
          }
        ]
      },
})


editor.blockManager.add('heading',{
     label: 'heading',
     category: 'heading',
     content: {
        tagName: 'div',
        draggable: false,
        attributes: { 'some-attribute': 'some-value' },
        components: [
          {
            tagName: 'span',
            content: '<b>Some static content</b>',
          }, {
            tagName: 'div',
            // use `content` for static strings, `components` string will be parsed
            // and transformed in Components
            components: '<span>HTML at some point</span>',
          }
        ]
    }
    })

    editor.Panels.addPanel({
        id: 'panel-top',
        el: '.panel__top',
      });
      editor.Panels.addPanel({
        id: 'basic-actions',
        el: '.panel__basic-actions',
        buttons: [
          {
            id: 'visibility',
            active: true, // active by default
            className: 'btn-toggle-borders',
            label: '<u>B</u>',
            command: 'sw-visibility', // Built-in command
          }, {
            id: 'export',
            className: 'btn-open-export',
            label: 'Exp',
            command: 'export-template',
            context: 'export-template', // For grouping context of buttons from the same panel
          }, {
            id: 'show-json',
            className: 'btn-show-json',
            label: 'JSON',
            context: 'show-json',
            command(editor) {
              editor.Modal.setTitle('Components JSON')
                .setContent(`<textarea style="width:100%; height: 250px;">
                  ${JSON.stringify(editor.getComponents())}
                </textarea>`)
                .open();
            },
          }
        ],
      });
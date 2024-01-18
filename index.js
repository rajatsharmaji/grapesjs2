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
            id: 'videos',
            label: 'videos',
            select: true,
            content: {type : 'video'}
          },
          {
            id: 'map',
            label: 'map',
            select: true,
            content: {type : 'map'}
          },
          {
            id: 'button',
            label: 'button',
            select: true,
            content: `
            <button type="button" class="btn">Button</button>
            `
          },
        ]
      },

      layerManager: {
        appendTo: '.layers-container'
      },

      panels: {
        defaults: [{
          id: 'layers',
          el: '.panel__right',
        },
        {
          id: 'panel__switcher',
          element: '.panel__switcher',
          buttons: [
            {
              id: 'show-layers',
              active: true,
              label: 'Layers',
              command: 'show-layers',
              togglable: false,
            },
            {
              id: 'show-styles',
              active: true,
              label: 'Style',
              command: 'show-styles',
              togglable: false,
            }
          ]
        }
      ]
      },
      selectorManager: {
        appendTo: '.styles-container'
      },

      StyleManger: {
        appendTo: '.styles-container',
        sectors: [{
          name: 'Dimension',
          open: false,
          buildProps: ['width', 'min-height', 'padding'],
          properties: [
            {
              type: 'integer',
              name: 'The width', 
              property: 'width', 
              units: ['px', '%'], 
              defaults: 'auto',
              min: 0, 
            },
            {
              name: 'Extra',
              open: false,
              buildProps: ['background-color', 'box-shadow', 'custom-prop'],
              properties: [
                {
                  id: 'custom-prop',
                  name: 'Custom Label',
                  property: 'font-size',
                  type: 'select',
                  defaults: '32px',
                  options: [
                    { value: '12px', name: 'Tiny' },
                    { value: '18px', name: 'Medium' },
                    { value: '32px', name: 'Big' },
                  ],
               }
              ]
            },
          ]
      }]
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

      editor.Commands.add('show-layers', {
        getRowEl(editor) { return editor.getContainer().closest('.editor-row'); },
        getLayersEl(row) { return row.querySelector('.layers-container') },
      
        run(editor, sender) {
          const lmEl = this.getLayersEl(this.getRowEl(editor));
          lmEl.style.display = '';
        },
        stop(editor, sender) {
          const lmEl = this.getLayersEl(this.getRowEl(editor));
          lmEl.style.display = 'none';
        },
      });
      editor.Commands.add('show-styles', {
        getRowEl(editor) { return editor.getContainer().closest('.editor-row'); },
        getStyleEl(row) { return row.querySelector('.styles-container') },
      
        run(editor, sender) {
          const smEl = this.getStyleEl(this.getRowEl(editor));
          smEl.style.display = '';
        },
        stop(editor, sender) {
          const smEl = this.getStyleEl(this.getRowEl(editor));
          smEl.style.display = 'none';
        },
      });
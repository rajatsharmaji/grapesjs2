const editor = grapesjs.init({
  container: "#gjs",
  fromElement: false,
  components: '<h1 style="text-align: center; color: saddlebrown">Welcome!</h1>',
  // attributes: { "some-attribute": "some-value" },
  height: "100vh",
  width: "auto",
  storageManager: false,
  panels: { defaults: [] },

  blockManager: {
    appendTo: "#blocks",
  },

  panels: {
    
    defaults: [

      {
        id: "layers",
        el: ".panel__right",
        // Make the panel resizable
        resizable: {
          maxDim: 350,
          minDim: 200,
          tc: 0, // Top handler
          cl: 1, // Left handler
          cr: 0, // Right handler
          bc: 0, // Bottom handler
          keyWidth: "flex-basis",
        },
      },
      {
        id: 'panel-switcher',
        el: '.panel__switcher',
        buttons: [{
            id: 'show-layers',
            active: true,
            label: `<i class="bi bi-layers"></i>`,
            command: 'show-layers',
            // Once activated disable the possibility to turn it off
            togglable: false,
          }, {
            id: 'show-style',
            active: true,
            label: `<i class="bi bi-filetype-css"></i>`,
            command: 'show-styles',
            togglable: false,
        }],
      }
    ],
    
  },

  selectorManager: {
    appendTo: '.styles-container'
  },

 
  styleManager: {
    appendTo: '.styles-container',
    sectors: [{
        name: 'Dimension',
        open: false,
        // Use built-in properties
        buildProps: ['width', 'min-height', 'padding'],
        // Use `properties` to define/override single property
        properties: [
          {
            // Type of the input,
            // options: integer | radio | select | color | slider | file | composite | stack
            type: 'integer',
            name: 'The width', // Label for the property
            property: 'width', // CSS property (if buildProps contains it will be extended)
            units: ['px', '%'], // Units, available only for 'integer' types
            defaults: 'auto', // Default value
            min: 0, // Min value, available only for 'integer' types
          }
        ]
      },{
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
            // List of options, available only for 'select' and 'radio'  types
            options: [
              { value: '12px', name: 'Tiny' },
              { value: '18px', name: 'Medium' },
              { value: '32px', name: 'Big' },
            ],
         }
        ]
      }]
  },

  
  layerManager: {
    appendTo: ".layers-container",
  },
});

editor.Panels.addPanel({
  id: "panel-top",
  el: ".panel__top",
});
editor.Panels.addPanel({
  id: "basic-actions",
  el: ".panel__basic-actions",
  buttons: [
    {
      id: "visibility",
      active: true, // active by default
      className: "btn-toggle-borders",
      label: `<i class="bi bi-lightbulb"></i>`,
      command: "sw-visibility", // Built-in command
    },
    {
      id: "export",
      className: "btn-open-export",
      label: `<i class="bi bi-download"></i>`,
      command: "export-template",
      context: "export-template", // For grouping context of buttons from the same panel
    },
    {
      id: "show-json",
      className: "btn-show-json",
      label: `<i class="bi bi-code"></i>`,
      context: "show-json",
      command(editor) {
        editor.Modal.setTitle("Components JSON")
          .setContent(
            `<textarea style="width:100%; height: 250px;">
                  ${JSON.stringify(editor.getComponents())}
                </textarea>`
          )
          .open();
      },
    },
  ],
});


editor.BlockManager.add('Heading', {
  label: 'Heading',
  category: {
    id: 'Typography',
    label: 'Typography',
    open: false,
  },
  content: `<span>
        <h1 style="">Heading</h1>
        </span>`,
})

editor.BlockManager.add('Paragraph', {
  label: 'paragraph',
  category: 'Typography',
  content: `<section>
        <p style="">paragraph</p>
        </section>`
})

editor.BlockManager.add('Image', {
  label: 'Image',
  category: {
    id: 'Media',
    label: 'Media',
    open: false,
  },
  content: {type:'image'},
  activate: true,
})

editor.BlockManager.add('Video', {
  label: 'Video',
  category: 'Media',
  content: {type:'video'},
  activate: true,
})

editor.BlockManager.add('Audio', {
  label: 'Audio',
  category: 'Media',
  content: `
            <audio controls>
               <source src="" type="audio/ogg">
               <source src="" type="audio/mpeg">
               Your browser does not support the audio tag.
            </audio>
            `,
})

editor.BlockManager.add('Navbar', {
  label: 'Navbar',
  category: {
    id: 'Navigation',
    label: 'Navigation',
    open: false,
  },
  content: `
  <nav class="navbar navbar-expand-sm bg-light">

<div class="container-fluid">
<!-- Links -->
<ul class="navbar-nav">
<li class="nav-item">
  <a class="nav-link" href="#">Link 1</a>
</li>
<li class="nav-item">
  <a class="nav-link" href="#">Link 2</a>
</li>
<li class="nav-item">
  <a class="nav-link" href="#">Link 3</a>
</li>
</ul>
</div>

</nav>`
})

editor.BlockManager.add('Button', {
  label: 'Button',
  category: 'Navigation',
  content: `
  <button type="button" class="btn">Button</button>
  `,
})

editor.BlockManager.add('table', {
  label: 'table',
  category:{
    id: 'table',
    label: 'table',
    open: false,
  },
  content: {type:'table'},
  active: true,
})

editor.BlockManager.add('thead', {
  label: 'thead',
  category:'table',
  content: {type:'thead'},
  active: true,
})

editor.BlockManager.add('tbody', {
  label: 'tbody',
  category:'table',
  content: {type:'tbody'},
  active: true,
})

editor.BlockManager.add('tfoot', {
  label: 'tfoot',
  category:'table',
  content: {type:'tfoot'},
  active: true,
})

editor.BlockManager.add('Map', {
  label: 'Map',
  category: {
    id: 'Other',
    label: 'Other',
    open: false,
  },
  content: {type:'map'},
  active: true,
})

editor.BlockManager.add('svg', {
  label: 'svg',
  category:'Other',
  content: {type:'svg'},
  active: true,
})


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
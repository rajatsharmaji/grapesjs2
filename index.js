const editor = grapesjs.init({
    container: '#gjs',
    fromElement: true,
    height:'850px',
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
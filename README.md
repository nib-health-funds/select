# select

A thin wrapper around a select input. 

Makes event handling easier (e.g. for emitting custom GA events).
 
## Installation

Browserify:

    npm install --save-dev @nib/select
    
Component:

    component install nib-health-funds/select

## Usage

HTML:

    <select class="js-select">
        <option>nib</option>
        <option selected>bupa</option>
        <option>hcf</option>
        <option>medibank</option>
    </select>

JavaScript:

    var select = require('select');

    select(document.querySelector('.js-select'))
      .on('selected', function() {
        console.log('selected:', this.value, this.values);
      })
      .on('changed', function() {
        console.log('changed:', this.value, this.values);
      })
      .select(3)
    ;

## API

### Methods

#### select(el: HTMLElement) : Select

Create a new select.

#### .value : string|null

Get the value of the selected option.

#### .values : Array.<string>

Get all the values of the options.

#### .select(index : number)

Select an option by index.

#### .select(value : string)

Select an option by value.

### Events

#### <>changed(value : string, previousValue : string|null)

Emitted when the selected value is different to the previously selected value.

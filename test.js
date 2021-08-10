const test_data= require('./test_input.js');
const getData = require ('./getData.js');

const assert= require('assert');

describe('While creating subset',function(){
    context('valid arguments', function(){
        it('should have equal array length'), function(){
            assert.equal(test_data.output.length, getData.clicksGetSubset(test_data.input).length);
        }
    });
    context('no input arguments', function(){
        it('should return an error', function(){
            assert.throws(()=>getData.clicksGetSubset(),'No Input!'            
            );
        });
    });
    context('invalid input arguments', function(){
        it('should thorw an error', function(){
            assert.throws(()=>getData.clicksGetSubset({xyz:7615}), "Invalid Arguments");
        });
    });
    
});
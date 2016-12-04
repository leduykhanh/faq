jest.dontMock('../../jsx/components/LoginForm.jsx');
//var React = require('react-tools');
//var React = require('react/addons');
var LoginForm = require('../../jsx/components/LoginForm.jsx');

var TestUtils = require('react-addons-test-utils');
//var createComponent = require('react-unit');

describe('form test', function() {
  it('changes the text after click', function() {
    var loginForm = TestUtils.renderIntoDocument(LoginForm );
	loginForm.refs.username.getDOMNode().value = 'ali';
	loginForm.refs.password.getDOMNode().value = 'password';
	var aform = TestUtils.findRenderedDOMComponentWithTag(loginForm, 'form');
	TestUtils.Simulate.submit(aform);
    expect(loginForm.refs.submit.getDOMNode().textContent).toEqual('Login');
  });
});
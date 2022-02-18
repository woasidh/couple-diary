import {LoginFormContainer} from './LoginPage';
import {render} from '../../components/Util/test';
import {fireEvent} from '@testing-library/react';

describe('LoginContainer initial State', () => {
  it('LoginContainer render', () => {
    const loginForm = render(<LoginFormContainer/>);
    expect(loginForm.container).toMatchSnapshot();
  })

  it('login button is disabled', () => {
    const loginForm = render(<LoginFormContainer/>);
    const loginBtn = loginForm.getByRole('button', {name: /로그인/})
    expect(loginBtn).toHaveAttribute('disabled');
  })

  it('login button delete disabled if text input', () => {
    const loginForm = render(<LoginFormContainer/>);
    const loginBtn = loginForm.getByRole('button', {name: /로그인/})
    const emailInput = loginForm.getByRole('textbox');
    fireEvent.change(emailInput, {target: {value: 'woasidh@ajou.ac.kr'}});
    expect(loginBtn).not.toHaveAttribute('disabled');
  })
})
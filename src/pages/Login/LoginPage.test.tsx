import {LoginFormContainer} from './LoginPage';
import {render} from '../../components/Util/test';
import {fireEvent} from '@testing-library/react';
import {screen} from '@testing-library/dom';

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
    const emailInput = screen.getByLabelText('이메일');
    fireEvent.change(emailInput, {target: {value: 'woasidh@ajou.ac.kr'}});
    expect(loginBtn).not.toHaveAttribute('disabled');
  })

  it('check email form', () => {
    const loginForm = render(<LoginFormContainer/>);
    const emailStatus = loginForm.getByTestId('email_status');
    const emailInput = screen.getByLabelText('이메일');
    fireEvent.change(emailInput, {target: {value: 'woasidh'}});
    expect(emailStatus).toHaveTextContent('@를 포함한 이메일 형식으로 입력해주세요')
    fireEvent.change(emailInput, {target: {value: 'woasidh@ajou.ac.kr'}});
    expect(emailStatus).toHaveTextContent('유효한 이메일입니다')
  })

  it('login success', () => {
    const mock = jest.fn();
  })
})
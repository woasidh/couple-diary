import {render} from '../../components/Util/test';
import {fireEvent} from '@testing-library/react';
import {screen} from '@testing-library/dom';
import LoginFormContainer from './LoginBox/LoginForm/LoginFormContainer';
import {createMemoryHistory} from 'history';
import axios from 'axios';
import {Router} from 'react-router-dom';
import AppHeaderContainer from '../../components/AppHeader/AppHeaderContainer';

jest.mock('axios');

describe('Login UI test', () => {
  it('LoginContainer render', () => {
    const loginForm = render(<LoginFormContainer/>);
    expect(loginForm.container).toMatchSnapshot();
  })

  it('login button is disabled', () => {
    const loginForm = render(<LoginFormContainer/>);
    const loginBtn = loginForm.getByRole('button', {name: /로그인/})
    expect(loginBtn).toHaveAttribute('disabled');
  })
})

describe('Login Event test', () => {
  it('login button delete disabled if text input', () => {
    const loginForm = render(<LoginFormContainer/>);
    const loginBtn = loginForm.getByRole('button', {name: /로그인/})
    const emailInput = screen.getByLabelText('이메일');
    fireEvent.change(emailInput, {target: {value: 'woasidh@ajou.ac.kr'}});
    expect(loginBtn).not.toHaveAttribute('disabled');
  })

  it('check email form', () => {
    const history = createMemoryHistory()

    const loginForm = render(
      <Router history={history}>
        <LoginFormContainer/>
      </Router>);
    const emailStatus = loginForm.getByTestId('email_status');
    const emailInput = screen.getByLabelText('이메일');
    fireEvent.change(emailInput, {target: {value: 'woasidh'}});
    expect(emailStatus).toHaveTextContent('@를 포함한 이메일 형식으로 입력해주세요')
    fireEvent.change(emailInput, {target: {value: 'woasidh@ajou.ac.kr'}});
    expect(emailStatus).toHaveTextContent('유효한 이메일입니다')
  })
})

describe('Login submit test', () => {
  it('if login success route to Workspace page', async () => {
    const history = createMemoryHistory()

    const response = {
      status: 200,
      data: {
        success: true,
        userData: {
          email: 'woasidh@ajou.ac.kr',
          name: 'chlalsdn'
        },
        coupleData: {
          isCouple: true,
          coupleId: 19,
          partnerEmail: 'adsfasdf',
          partnerName: 'asdfasdf'
        }
      }
    };

    // axios.post 정상 response 보내주게 mock
    (axios.post as jest.Mock).mockImplementation(() => {
      return new Promise((resolve) => {
        resolve(response)
      })
    })

    const loginForm = render(
      <Router history={history}>
        <AppHeaderContainer/>
        <LoginFormContainer/>
      </Router>);

    // 로그아웃 버튼 없어야 함
    expect(() => screen.getAllByText('Logut')).toThrow();

    const emailInput = screen.getByLabelText('이메일');
    fireEvent.change(emailInput, {target: {value: 'woasidh@ajou.ac.kr'}});
    const passwordInput = screen.getByLabelText('비밀번호');
    fireEvent.change(passwordInput, {target: {value: 'yoohoo77'}});
    const loginBtn = loginForm.getByRole('button', {name: /로그인/});
    // todo redux non-serializable value was detected in the state 오류 해결하기 (done)
    fireEvent.click(loginBtn);

    // 로그인 버튼 누르고 나서는 로그아웃 버튼 있어야 함
    const logoutBtn = await screen.findAllByText('Logout');
    expect(logoutBtn[0]).toBeInTheDocument();
  })
})
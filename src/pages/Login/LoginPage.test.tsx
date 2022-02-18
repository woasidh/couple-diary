import LoginPage from './LoginPage';
import Renderer from 'react-test-renderer';

test('1 + 1 = 2', () => {
  const LL = Renderer.create(<LoginPage/>);
})
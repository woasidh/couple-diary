import React, {ReactElement} from 'react';
import {useHistory} from 'react-router-dom';

const LoginFooter = (): ReactElement => {

  const history = useHistory();

  return (
    <div className="login_footer">
      <button className="lost_pwd">비민번호를 잊어버렸어요</button>
      <div className="signup">
        <span>아직 회원이 아니신가요? </span>
        <button onClick={(): void => history.push('/signup')}>회원 가입하기</button>
      </div>
    </div>
  );
}

export default LoginFooter;
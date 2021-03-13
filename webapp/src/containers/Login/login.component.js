/* eslint-disable constructor-super */
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ProviderLogin } from '@inrupt/solid-react-components';
import { LoginWrapper, LoginPanel, PanelBody, LoginTitle } from './login.style';
import { CenterContainer } from '@util-components';
import { Provider } from '@services';

const LoginComponent = () => {
  const { t } = useTranslation();
  return (
    <LoginWrapper data-testid="login-wrapper">
      <CenterContainer>
        <h1 data-testid="title">{t('login.title')}</h1>
        <LoginPanel className="login-panel">
          <PanelBody className="panel-body">
            <Link className="ids-link-filled ids-link-filled--primary" to="/register">
              {t('login.register')}
            </Link>
            <a
              href="https://solid.inrupt.com/get-a-solid-pod"
              rel="noopener noreferrer"
              target="_blank"
              className="link"
            >
              {t('login.solidHelp')}
            </a>
            <LoginTitle data-testid="login-title">
              <span>{t('login.loginTitle')}</span>
            </LoginTitle>
            <ProviderLogin
              selectPlaceholder={t('login.selectPlaceholder')}
              inputPlaholder={t('login.inputPlaholder')}
              formButtonText={t('login.formButtonText')}
              btnTxtWebId={t('login.btnTxtWebId')}
              btnTxtProvider={t('login.btnTxtProvider')}
              className="provider-login-component"
              callbackUri={`${window.location.origin}/welcome`}
              errorsText={{
                unknown: t('login.errors.unknown'),
                webIdNotValid: t('login.errors.webIdNotValid'),
                emptyProvider: t('login.errors.emptyProvider'),
                emptyWebId: t('login.errors.emptyWebId')
              }}
              theme={{
                buttonLogin: 'ids-link',
                inputLogin: '',
                linkButton: ''
              }}
              providers={Provider.getIdentityProviders()}
            />
          </PanelBody>
        </LoginPanel>
      </CenterContainer>
    </LoginWrapper>
  );
};

export default LoginComponent;

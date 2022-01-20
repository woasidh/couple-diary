module.exports = {
  env: {
    'node': true
  },
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    'quotes': [2, 'single'], // 따옴표 사용
    'comma-spacing': [2, {after: true}], // 콤마 뒤에 spacing
    'eqeqeq': 2, // ===
    'camelcase': 2, // 카멜케이스,
    'no-console': 1, // console 로그는 warning으로
    'no-var': 2,
    '@typescript-eslint/no-explicit-any': 0, // any type 허용
    '@typescript-eslint/no-namespace': 0, // namespace 쓸 수 있게
    '@typescript-eslint/array-type': [2, {default: 'generic'}], // Array<T> 형식으로 쓰기
    '@typescript-eslint/type-annotation-spacing': 2, // : void 처럼 타입 기입 전에 whitespace
    '@typescript-eslint/explicit-function-return-type': 2,
    '@typescript-eslint/no-unused-vars': ['off']
  }};

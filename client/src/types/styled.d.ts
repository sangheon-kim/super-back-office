import 'styled-components';

type Colors =
  | 'bg100'
  | 'white'
  | 'black'
  | 'gray50'
  | 'gray100'
  | 'gray200'
  | 'gray300'
  | 'gray400'
  | 'gray500'
  | 'gray600'
  | 'gray700'
  | 'gray800'
  | 'gray900'
  | 'red'
  | 'orange'
  | 'yellow'
  | 'green'
  | 'blue'
  | 'pink'
  | 'primary50'
  | 'primary100'
  | 'primary300'
  | 'primary500'
  | 'primary700'
  | 'primary800'
  | 'primary900';

type Typographys =
  | 'headline1'
  | 'headline2'
  | 'headline3'
  | 'headline4'
  | 'headline5'
  | 'headline6'
  | 'subtitle1'
  | 'subtitle2'
  | 'body1'
  | 'body2'
  | 'button'
  | 'caption1'
  | 'caption2'
  | 'overline';

declare module 'styled-components' {
  export interface DefaultTheme {
    color: Record<Colors, string>;
    typography: Recored<Typographys, ThemedCssFunction>;
  }
}

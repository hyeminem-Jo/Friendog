# 내일의 집

### 1. GNB

- 로그인 하지 않은 경우

``` html
<div class="button-group">
  <button class="gnb-icon-button is-seach lg-hidden" type="button" aria-label="검색창 열기 버튼">
    <i class="ic-search"></i>
  </button>
  <a class="gnb-icon-button is-cart" href="/" aria-label="장바구니로 이동">
    <i class="ic-cart"></i>
  </a>
  <div class="gnb-auth sm-hidden">
    <a href="/">로그인</a>
    <a href="/">회원가입</a>
  </div>
</div>
````
- 로그인 한 경우

``` html
<div class="button-group">
  <button class="gnb-icon-button is-seach lg-hidden" type="button" aria-label="검색창 열기 버튼">
    <i class="ic-search"></i>
  </button>
  <a class="gnb-icon-button sm-hidden" href="/" aria-label="스크랩북 페이지로 이동">
    <i class="ic-bookmark"></i>
  </a>
  <a class="gnb-icon-button sm-hidden" href="/" aria-label="내 소식 페이지로 이동">
    <i class="ic-bell"></i>
  </a>
  <a class="gnb-icon-button is-cart" href="/" aria-label="장바구니로 이동">
    <i class="ic-cart"></i>
    <strong class="badge">5</strong>
  </a>
  <button class="gnb-avatar-button sm-hidden" type="button" aria-label="마이메뉴 열기 버튼">
    <div class="avatar-32">
      <img src="./assets/images/img-user-01.jpg" alt="유저 이미지" />
    </div>
  </button>
</div>
```

### 2. SIDEBAR

- 로그인 하지 않은 경우
```html
<aside class="sidebar sm-only">
    <header class="sidebar-header">
      <h1 class="logo">
        <a href="/"><img src="./assets/images/logo.svg" alt="내일의 집"></a>
      </h1>
      <div class="sidebar-auth">
        <a class="btn-40 btn-outlined" href="/">로그인</a>
        <a class="btn-40 btn-primary" href="/">회원가입</a>
      </div>
    </header>

    <nav class="sidebar-nav">
      <h2 class="visually-hidden">메뉴</h2>
      <div class="drawer-menu">
        <button type="drawer-menu-button">
          <i class="ic-store" aria-hidden></i>
          스토어
          <i class="ic-chevron" aria-hidden></i>
        </button>
        <div class="drawer-menu-content">
          <ul class="drawer-menu-list">
            <li class="drawer-menu-item"><a href="/">스토어</a></li>
            <li class="drawer-menu-item"><a href="/">카테고리</a></li>
            <li class="drawer-menu-item"><a href="/">신혼가구</a></li>
            <li class="drawer-menu-item"><a href="/">
              기획전
              <i class="ic-new" lang="en" aria-label="New"></i>
            </a></li>
          </ul>
        </div>
      </div>
    </nav>
  </aside>
```

- 로그인 한 경우
```html
<aside class="sidebar sm-only">
    <header class="sidebar-header">
      <h1 class="logo">
        <a href="/"><img src="./assets/images/logo.svg" alt="내일의 집"></a>
      </h1>
      <div class="sidebar-user">
        <a href="/">
          <div class="avatar-24">
            <img src="./assets/images/img-user-01.jpg" alt="유저 이미지" />
          </div>
          <strong class="username">사달라그이하는절대받지않으오</strong>
        </a>
      </div>
    </header>

    <nav class="sidebar-nav">
      <h2 class="visually-hidden">메뉴</h2>
      <div class="drawer-menu">
        <button type="drawer-menu-button">
          <i class="ic-store" aria-hidden></i>
          스토어
          <i class="ic-chevron" aria-hidden></i>
        </button>
  
        <div class="drawer-menu-content">
          <ul class="drawer-menu-list">
            <li class="drawer-menu-item"><a href="/">스토어</a></li>
            <li class="drawer-menu-item"><a href="/">카테고리</a></li>
            <li class="drawer-menu-item"><a href="/">신혼가구</a></li>
            <li class="drawer-menu-item"><a href="/">
              기획전
              <i class="ic-new" lang="en" aria-label="New"></i>
            </a></li>
          </ul>
        </div>
      </div>
  
      <div class="sidebar-user-menu">
        <ul class="user-menu-list">
          <li class="user-menu-item"><a href="/">마이페이지</a></li>
          <li class="user-menu-item"><a href="/">나의 쇼핑</a></li>
          <li class="user-menu-item"><a href="/">스크랩북</a></li>
          <li class="user-menu-item"><a href="/">알림</a></li>
          <li class="user-menu-item"><a href="/">이벤트</a></li>
        </ul>
      </div>
    </nav>
  </aside>
```
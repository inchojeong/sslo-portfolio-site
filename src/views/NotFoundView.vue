<template>
  <section class="nf">
    <div class="container">

      <p class="eyebrow">404</p>
      <h1 class="h1">페이지를 찾을 수 없습니다</h1>
      <p class="lead">주소가 바뀌었거나 아직 준비 중인 페이지입니다.</p>
      <RouterLink to="/" class="btn btn--dark">홈으로 돌아가기</RouterLink>
    </div>
  </section>
</template>

<style scoped>
.nf { padding: calc(var(--header-h) + 120px) 0 140px; background: var(--bg-soft); }
.nf .container { display: grid; gap: 18px; justify-items: start; }
</style>

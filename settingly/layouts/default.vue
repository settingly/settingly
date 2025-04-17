<template>
  <div class="flex flex-col min-h-screen">
    <LayoutNavbar />

    <main class="flex-grow">
      <slot></slot>
    </main>

    <LayoutFooter />
  </div>
</template>

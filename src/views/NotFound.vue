<template>
  <v-container class="fill-height">
    <v-responsive class="fill-height">
      <v-row>
        <v-col>
          <h1 class="text-h4 error-header">Huch! Irgendetwas ist schief gelaufen.</h1>
          <p class="error-message">Die Seite, die du angefragt hast, konnten wir auf unseren Servern nicht finden.<br>Hast
            du dich vielleicht vertippt?
          </p>
          <div>

            <v-btn color="primary"
                   to="/"
                   min-width="228"
                   size="x-large"
                   variant="flat">
              <v-icon
                  icon="mdi-home"
                  size="large"
                  start
              />
              <v-tooltip
                  activator="parent"
                  location="bottom"
              >Country roads, take me home...
              </v-tooltip>
              Zurück zur Startseite
            </v-btn>
          </div>
        </v-col>
        <v-col>
          <span class="error-code">404</span>

        </v-col>
      </v-row>

    </v-responsive>
  </v-container>
</template>

<script setup>
</script>

<style lang="scss">

.error-message {
  font-size: 1.25rem;
  line-height: 1.5;
  margin-bottom: 1.5rem;
  max-width: 500px;
}

.error-header {
  font-size: 1.75rem;
  font-weight: 400;
  letter-spacing: 0;
  margin-bottom: 1.5rem;
  padding-top: 1.5rem;
}

.error-code {
  font-size: 300px;
  line-height: 1.13;
  font-weight: 600;
  letter-spacing: 0;
  margin: 2.5rem 0;
  display: inline-block;
  background: linear-gradient(35deg, #1867C0, #BB86FC);
  -webkit-background-clip: text;
  -webkit-text-fill-color: #0000;
}

@media only screen and (max-width: 2000px) {
  .error-code {
    font-size: 300px;
  }
}

@media only screen and (max-width: 1904px) {
  .error-code {
    font-size: 300px;
  }
}

@media only screen and (max-width: 1264px) {
  .error-code {
    font-size: 300px;
  }
}

@media only screen and (max-width: 960px) {
  .error-code {
    font-size: 50vw;
  }
}

@media only screen and (max-width: 600px) {
  .error-code {
    font-size: 25vw;
  }
}

</style>
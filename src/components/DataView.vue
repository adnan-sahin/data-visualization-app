<template>
  <div>
    <v-container>
      <v-layout>
        <v-flex>
          <v-card>
            <v-card-title class="headline grey-text">
              <input type="file" ref="file" id="csv_file" name="csv_file" />
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="parseData">Parse CSV File</v-btn>
              <v-btn
                :disabled="items.length==0"
                color="secondary"
                @click="downloadJsonFile"
              >Download JSON File</v-btn>
            </v-card-title>
            <v-flex md6 offset-md3>
              <v-text-field
                v-model="search"
                append-icon="search"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
            </v-flex>
            <v-data-table
              :headers="headers"
              :items="items"
              multi-sort
              :search="search"
              :rows-per-page-items="rowPerPageItems"
            >
              <template v-slot:items="props">
                <td
                  v-for="(header,index) in headers"
                  :key="index"
                  class="text-xs-left"
                >{{ props.item[header.value] }}</td>
              </template>
            </v-data-table>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
import Papa from "papaparse";
import { ExportDataToJsonFile } from "../helpers";
export default {
  data() {
    return {
      search: "",
      parsedHeaders: [],
      items: [],
      rowPerPageItems: [10, 20, 30, 40, 50]
    };
  },
  computed: {
    headers() {
      return this.parsedHeaders.map(header => {
        return { text: this.capitalize(header), value: header };
      });
    }
  },

  methods: {
    parseData() {
      this.loadData();
    },
    capitalize: function(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    },
    downloadJsonFile() {
      const data = JSON.stringify(this.items);
      ExportDataToJsonFile(data);
    },
    dataToJSON(data) {
      const lines = data;
      const result = [];
      const headers = lines[0];
      this.parsedHeaders = headers;

      lines.map((line, indexLine) => {
        if (indexLine < 1) return;
        const obj = {};
        headers.map((header, indexHeader) => {
          obj[header] = line[indexHeader];
        });
        result.push(obj);
      });

      result.pop();

      return result;
    },
    loadData(e) {
      const vm = this;
      if (window.FileReader) {
        const reader = new FileReader();
        reader.readAsText(this.$refs.file.files[0]);
        reader.onload = event => {
          const result = event.target.result;
          const data = Papa.parse(result).data;
          vm.items = vm.dataToJSON(data);
        };
        reader.onerror = event => {
          if (event.target.error.name == "NotReadableError") {
            alert("Cannot read file!");
          }
        };
      } else {
        alert("FileReader are not supported in this browser.");
      }
    }
  }
};
</script>
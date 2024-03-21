class MysqlDB {
    #BaseKey;
    #BaseUri;
    constructor(DbUrl, DbKey) {
      this.#BaseUri = DbUrl;
      this.#BaseKey = DbKey;
    }
  
    async query(sqlQuery, params) {
      const queryBase64 = btoa(sqlQuery);
      const url = `${this.#BaseUri}`;
  
      if (!this._validateInput(params)) {
        throw new Error("Datos invalidos.");
      }
  
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Key': this.#BaseKey
          },
          body: JSON.stringify({
            query: queryBase64,
            params: params,
          }),
        });
  
        if (response.ok) {
          const data = await response.json();
          return { status: true, data: data };
        } else {
          throw new Error(`Error al ejecutar la consulta: ${response.statusText}`);
        }
      } catch (error) {
        console.error("Error:", error);
        return { status: false, error: error.message };
      }
    }
  
    _validateInput(inputData) {
      return Array.isArray(inputData) && inputData.length > 0;
    }
  }
  

  

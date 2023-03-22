import {Box, Button, Toolbar, Typography, useTheme} from '@mui/material'
import {DataGrid, GridToolbar} from '@mui/x-data-grid'
import styles  from './licenses.module.css'
import { Link } from 'react-router-dom';
import React, { useEffect, useState} from 'react';
import { fontFamily, fontWeight } from '@mui/system';
import axios from 'axios';

const Licenses = () => {  

  var [input, setInput] = useState();
  const [licensesData, setLicensesData] = useState([]);

  async function handleSubmit(e){
    e.preventDefault();
    setInput("")
    const fetch = () => {
      return new Promise((resolve, reject) => {
        const options = {
            codeDir: `${input}`
        }
        axios
          .post("http://localhost:5432/application-licenses", options)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    };
    fetch()
      .then((res) => setLicensesData(res.data.licenses))
      .catch((error) => {
        console.log("ERROR:", error);
      });
      
  }
  

    const columns = [
      {field: "dependency", headerName:"PACKAGE", headerAlign: "left", align: "left",  cellClassName: "cell-column-name", flex: 1},
      {field: "license", headerName:"LICENSE",  cellClassName: "cell-column-name", flex: 1},
      {field: "path", headerName:"PATH", cellClassName: "cell-column-name", flex: 2}
    ]
    return(
      
        <div className={styles.general}>
           
       

      
        <div className={styles.header}>
            LICENSE MANAGEMENT TOOL
        </div>
 
                
                <form onSubmit={handleSubmit}>
                <input 
                rows={1} 
                value={input} 
                onChange={(e) => setInput(e.target.value)}
                className={styles.textBox} 
                placeholder="Enter local path of your root code directory"
                >
                  
          </input>
          </form>
    
        <div className={styles.subtitle}>
          Get nformation about your 3rd party dependencies and licenses  
        </div>
          <Box className={styles.dataGrid} sx={{
              "& .MuiDataGrid-root": {
                border: "none"
              },
                "& .MuiDataGrid-cell": {
                  borderBottom: "none"
                },
                "& .cell-column-name": {
                  color: "rgba(255,255,255)",
                  fontFamily: "Arial",
                  fontWeight: "600"
                },
                "& .MuiDataGrid-columnHeaderTitle":{
                  color: "rgb(255, 255, 255)",
                  fontFamily: "Arial",
                  fontWeight: "700"
                },
                "& .MuiTablePagination-selectLabel":{
                  color: "rgb(255, 255, 255)",
                  fontFamily: "Arial"
                },
                "& .MuiTablePagination-displayedRows":{
                  color: "rgb(255, 255, 255)",
                  fontFamily: "Arial"
                },
                "& .MuiSelect-select":{
                  color: "rgb(255, 255, 255)",
                  fontFamily: "Arial"
                },
                "& .MuiSvgIcon-root": {
                  color: "rgb(76, 76, 76)"
                },
                "& .MuiDataGrid-selectedRowCount":{
                  color: "rgb(255, 255, 255)",
                  fontFamily: "Arial"
                },
                "& .css-yrdy0g-MuiDataGrid-columnHeaderRow":{
                  backgroundColor: "rgb(40, 40, 40)"
                },
                "& .MuiDataGrid-virtualScrollerContent":{
                  backgroundColor: "rgb(60, 60, 60)"
                },
                "& .MuiDataGrid-footerContainer":{
                  backgroundColor: "rgb(40, 40, 40)"
                },
                "& .MuiButton-textPrimary":{
                  color: "rgb(76, 76, 76)"
                }
              
          }}>
            <DataGrid 
              columns={columns}
              rows={licensesData}
              components={{Toolbar: GridToolbar}}
              sx={{
                "&:hover": {
                  cursor: "pointer"
                },
              }}
            />
        
          </Box>
        </div>
    )
}


export default Licenses;
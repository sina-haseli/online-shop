import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Item from '../Item/Item';
import CircularProgress from '@material-ui/core/CircularProgress';
import './ProductList.css';
import queryString from 'query-string';
import Dropdown from 'react-dropdown';
import FromControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';
import Paging from '../Paging/Paging';
import PriceDialog from '../PriceDialog/PriceDialog';
import Api from "../../Api"
import axios from 'axios';
import {getProducts} from '../../Redux/Actions';
import {withRouter} from "react-router-dom";
import connect from "react-redux/es/connect/connect";




class ProductList extends Component{
    constructor(props){
        super(props);
        this.state= {
            unfinishedTasks: false,
            openPriceDialog: false,
            minDraft: null,
            maxDraft: null,
            isDraft:false,
            itemsPerPage: null,
            wholeDataLength: null,
            items:[]
        };

        this.getPramFromProps = this.getPramFromProps.bind(this);
        this.updateURLAndRedirect = this.updateURLAndRedirect.bind(this);

    }

    //convert given object to query string :)
    objectToQueryString(params) {
        var esc = encodeURIComponent;
        var query = Object.keys(params)
            .map(k => esc(k) + '=' + esc(params[k] !== undefined ? params[k] : ""))
            .join('&');
        return query;
    }

    //update existing query string
    updateURLAndRedirect(newValues, restartPaging) {
        let currentQs = queryString.parse(this.props.location.search);
        let newQS = {...currentQs,...newValues};

        if (restartPaging) {
            delete newQS["page"];
        }

        this.props.history.push('/search/?'+ this.objectToQueryString(newQS));


    }


    //extract parameter with given name from query string

    getPramFromProps(name, props = this.props) {
        let qs = queryString.parse(props.location.search);

        switch (name) {

            case    'category':
                return qs.category || "popular";
            case    'term':
                return qs.term || "";
            case    'page':
                return qs.page || "1";
            case    'minPrice' :
                return qs.minPrice || "0";
            case    'maxPrice':
                return qs.maxPrice || "1000";
            case    'usePriceFilter':
                return qs.usePriceFilter === "true";
            case    'sortValue':
                return qs.sortValue || "lh";
            case    'directCategory':
                return qs.directcategory === "true";
            default:
                return undefined;
        }
    }


     fetchData (props = this.props) {
        //this.setState((ps)=>({unfinishedTasks:ps.unfinishedTasks+1}))
        //i don't know what should i do here but i think use get product from backend
       /*Api.searchData({
            category: this.getPramFromProps("category", props),
            term: this.getPramFromProps("term", props),
            page: this.getPramFromProps("page", props),
            minPrice: this.getPramFromProps("minPrice", props),
            maxPrice: this.getPramFromProps("maxPrice", props),
            sortValue: this.getPramFromProps("sortValue", props),
            usePriceFilter: this.getPramFromProps("usePriceFilter", props),
        }).then((data) => {
            this.setState((ps) => ({
                items: data.data,
                unfinishedTasks: ps.unfinishedTasks - 1,
                itemsPerPage: data.itemsPerPage,
                wholeDataLength: data.totalLength
            }))
        }) */
    }

    /*componentWillMount() {
        axios.get(`https://api.parand-computer.ir/v1/products`)
            .then(res=>this.setState({items:res.data}))
            .catch((error)=>{
                error.alert("!!!");
                console.log(error);
            });
    }

    */


    componentDidMount() {
    this.setState((ps)=>({unfinishedTasks:ps.unfinishedTasks+1}));
        axios.get(`https://api.parand-computer.ir/v1/products`)
            .then(res=>this.setState((ps)=>({items:res.data,
                unfinishedTasks: ps.unfinishedTasks - 1,
                itemsPerPage: res.data.itemsPerPage,
                wholeDataLength: res.data.totalLength
            })))
            .catch(err=>{
              console.log(err)
            })
    }

    componentWillReceiveProps(nextProps){
        this.fetchData(nextProps);
    }

    handleSortChange = (e) => {
        this.updateURLAndRedirect({sortValue: e.value})
    };

    pageTitle() {
        let pageTitle;
        if (this.getPramFromProps("category")==="popular"){
            pageTitle = "Popular Products";
        } else if (this.getPramFromProps("directcategory")){
            pageTitle = this.getPramFromProps("category");
        } else {
            pageTitle = "Search Results";
        }
        return pageTitle;
    }

    render() {

        return (
          <div className="product=list">
              <div className="product-list-header">
                  <div className="online-shop-title">{this.pageTitle()}</div>
                  <div style={{width:500,marginTop:5, display:"flex", flexGrow: 1, flexDirection:"row-reverse"}}>

                      <div style={{width:250}}>
                          <Dropdown
                              options={[
                                  {value: 'lh', label: 'sort by price: Low to High'},
                                  {value: 'hl', label: 'sort by price:High to Low'},
                              ]}
                              className="react-dropdown"
                              onChange={this.handleSortChange}
                              value={this.getPramFromProps("sortValue")}
                          />
                      </div>

                      {this.getPramFromProps("usePriceFilter") &&
                          <Tooltip title="Click to change range" diablefocuslistener="true" >
                              <Button
                                style={{marginRight:20, height:10}}
                                onClick={()=>{
                                    this.setState({openPriceDialog:true})
                                }}>{this.getPramFromProps("minPrice")+ "$ -" + this.getPramFromProps("maxPrice") + "$"}
                              </Button>
                          </Tooltip>}
                      <FromControlLabel
                          style={{marginBottom:5}}
                          control={
                              <Checkbox
                                  color="primary"
                                  checked={this.getPramFromProps("usePriceFilter")}
                                  style={{marginBottom:5}}
                                  onChange={(e)=>{
                                      this.updateURLAndRedirect({usePriceFilter:e.target.checked},true)
                                  }}
                              />
                          }
                          label="Filter by price"
                      />
                  </div>
              </div>
              <div style={{flex:1,display:"flex", flexDirection:"column"}}>
                  <div style={{flex:1}}>
                      {this.state.unfinishedTasks !==0?
                          <CircularProgress /> :
                          this.state.items.map(item => {
                              return (
                                  <Item
                                      key={item.id}
                                      item={item}
                                  />
                              )
                          })}
                  </div>
                  {this.state.unfinishedTasks ===0 &&
                     <Paging
                           getParamFromProps={this.getPramFromProps}
                           updateURLAndRedirect={this.updateURLAndRedirect}
                           itemPrePage={this.state.itemsPerPage}
                           wholeDataLength={this.state.wholeDataLength}
                      />
                      }
              </div>
              <PriceDialog
                   open={this.state.openPriceDialog}
                   min={this.state.isDraft ? this.state.minDraft : this.getPramFromProps("minPrice")}
                   max={this.state.isDraft ? this.state.maxDraft : this.getPramFromProps("maxPrice")}
                   onChange={(min,max) => this.setState({minDraft:min,maxDraft:max,isDraft:true})}
                   onSave={() => {
                       if (this.state.isDraft){
                           this.setState({isDraft: false});
                           this.updateURLAndRedirect({minPrice: this.state.minDraft,maxPrice: this.state.maxDraft},true);
                       }
                       this.setState({openPriceDialog: false})
                   }}
                   onClose={() => this.setState({openPriceDialog:false, isDraft:false})}
              />
          </div>
        );
    }

}
const mapStateToProps = (state) => ({
    errors: state.errors,
});
const ProductList0 = withRouter(connect(mapStateToProps,{getProducts})(ProductList));
export default ProductList0;
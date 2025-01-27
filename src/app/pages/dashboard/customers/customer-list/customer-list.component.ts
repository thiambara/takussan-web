import {Component, OnInit, ViewChild} from '@angular/core';
import {MessageService} from 'primeng/api';
import {User as Customer} from "../../../../core/models/http/user.model";
import {CustomerService} from "../../../../core/sevices/http/customer.service";
import {Toolbar} from "primeng/toolbar";
import {Ripple} from "primeng/ripple";
import {InputText} from "primeng/inputtext";
import {Table, TableModule} from "primeng/table";
import {FormsModule} from "@angular/forms";
import {DialogService} from "primeng/dynamicdialog";
import {CustomerFormComponent} from "../customer-form/customer-form.component";
import {Button} from "primeng/button";
import {IconField} from "primeng/iconfield";
import {InputIcon} from "primeng/inputicon";

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  imports: [
    Ripple,
    Button,
    IconField,
    InputIcon,
    Toolbar,
    TableModule,
    FormsModule,
    InputText,
  ],
  standalone: true
})
export class CustomerListComponent implements OnInit {
  @ViewChild('customersTable') customersTable!: Table;

  customers: Customer[] = [];
  customer: Customer = {};
  selectedCustomers: Customer[] = [];

  searchQuery: string = '';
  searchQueryTimeout!: any;
  rowsPerPageOptions = [5, 10, 20];

  constructor(private customerService: CustomerService, private messageService: MessageService, private dialogService: DialogService) {
  }

  ngOnInit() {
    this.getCustomers();
  }

  getCustomers() {


    this.customerService.index({
      search_query: this.searchQuery,
    }).subscribe({
      next: data => this.customers = (data as Customer[]),
      error: error => this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: error.message || 'An error has occurred',
        life: 3000
      })
    });
  }

  openNew() {
    this.showCustomerForm();
  }

  onSearch() {
    if (this.searchQueryTimeout) {
      clearTimeout(this.searchQueryTimeout);
    }
    this.searchQueryTimeout = setTimeout(() => {
      this.getCustomers();
    }, 500);
  }


  showCustomerForm(customer?: Customer) {
    if (customer && !this.canEditCustomer(customer)) return;
    this.dialogService.open(CustomerFormComponent, {
      header: customer?.id ? 'Update customer' : 'Create new customer',
      width: '45rem',
      closable: true,
      data: {
        customer: customer ?? {}
      }
    }).onClose.subscribe({
      next: (value) => {
        if (value) {
          this.getCustomers();
        }
      }
    });
  }

  canEditCustomer(customer: Customer) {
    return customer.added_by_id === authUser.id;
  }

  exportCSV() {
    this.customersTable.exportCSV();
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { CurrencyPipe } from '@angular/common';
import { FinancialDataService } from './financial-data.service';
import * as Papa from 'papaparse';
import { first } from 'rxjs';

@Component({
  selector: 'app-financial-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    CurrencyPipe
  ],
  templateUrl: './financial-dashboard.component.html',
  styleUrls: ['./financial-dashboard.component.scss']
})
export class FinancialDashboardComponent implements OnInit {
  savingsBalance: number;
  checkingBalance: number;
  investmentBalances: number;
  mortgageBalance: number;

  monthlyBudget: any[] = [];
  recentTransactions: any[] = [];
  savingsGoals: any[] = [];

  budgetDisplayedColumns: string[] = ['category', 'budgeted', 'spent', 'remaining'];
  transactionDisplayedColumns: string[] = ['date', 'vendor', 'category', 'amount'];
  savingsGoalsDisplayedColumns: string[] = ['name', 'targetAmount', 'currentAmount', 'remainingAmount'];

  selectedFile: File | null = null;

  constructor(private financialDataService: FinancialDataService) { }

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    this.financialDataService.getAccountSummary().pipe(first()).subscribe(data => {
      this.savingsBalance = data?.savingsBalance;
      this.checkingBalance = data?.checkingBalance;
      this.investmentBalances = data?.investmentBalances;
      this.mortgageBalance = data?.mortgageBalance;
    });

    this.financialDataService.getMonthlyBudget().pipe(first()).subscribe(data => {
      this.monthlyBudget = data;
    });

    this.financialDataService.getRecentTransactions().pipe(first()).subscribe(data => {
      this.recentTransactions = data;
    });

    this.financialDataService.getSavingsGoals().pipe(first()).subscribe(data => {
      this.savingsGoals = data;
    });
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  uploadCSV(): void {
    if (this.selectedFile) {
      Papa.parse(this.selectedFile, {
        header: true,
        complete: (result) => {
          const transactions = result.data;
          this.financialDataService.saveData({ recentTransactions: transactions }).pipe(first()).subscribe(() => {
            this.loadData();
          });
        }
      });
    }
  }
}
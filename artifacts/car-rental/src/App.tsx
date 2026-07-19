import { Route, Switch, Router as WouterRouter } from 'wouter';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { AppShell } from '@/components/layout/AppShell';

import DashboardPage from '@/pages/DashboardPage';
import VehiclesPage from '@/pages/VehiclesPage';
import AddVehiclePage from '@/pages/AddVehiclePage';
import VehicleDetailPage from '@/pages/VehicleDetailPage';
import CustomersPage from '@/pages/CustomersPage';
import AddCustomerPage from '@/pages/AddCustomerPage';
import CustomerDetailPage from '@/pages/CustomerDetailPage';
import RentalsPage from '@/pages/RentalsPage';
import NewRentalPage from '@/pages/NewRentalPage';
import RentalDetailPage from '@/pages/RentalDetailPage';
import MaintenancePage from '@/pages/MaintenancePage';
import AddMaintenancePage from '@/pages/AddMaintenancePage';
import AnalyticsPage from '@/pages/AnalyticsPage';
import NotFound from '@/pages/not-found';

function Router() {
  return (
    <Switch>
      <Route path="/" component={DashboardPage} />
      <Route path="/vehicles" component={VehiclesPage} />
      <Route path="/vehicles/add" component={AddVehiclePage} />
      <Route path="/vehicles/:id" component={VehicleDetailPage} />
      <Route path="/customers" component={CustomersPage} />
      <Route path="/customers/add" component={AddCustomerPage} />
      <Route path="/customers/:id" component={CustomerDetailPage} />
      <Route path="/rentals" component={RentalsPage} />
      <Route path="/rentals/new">
        {/* Full-screen flow without bottom navigation */}
        <div className="max-w-[480px] mx-auto h-[100dvh] flex flex-col bg-background relative overflow-hidden shadow-2xl">
          <NewRentalPage />
        </div>
      </Route>
      <Route path="/rentals/:id" component={RentalDetailPage} />
      <Route path="/maintenance" component={MaintenancePage} />
      <Route path="/maintenance/add">
        {/* Full-screen flow without bottom navigation */}
        <div className="max-w-[480px] mx-auto h-[100dvh] flex flex-col bg-background relative overflow-hidden shadow-2xl">
          <AddMaintenancePage />
        </div>
      </Route>
      <Route path="/analytics" component={AnalyticsPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <TooltipProvider>
      <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
        {/* We use an exact path check here or inside AppShell. Let's just wrap the main routes with AppShell and let the Switch render inside. The exceptions are handled explicitly in the Routes above via Route nesting, but wouter doesn't allow easy Layout composition based on active route without custom logic. Since only two routes exclude AppShell, we handle it thus: */}
        
        <Switch>
          <Route path="/rentals/new">
            <div className="max-w-[480px] mx-auto h-[100dvh] flex flex-col bg-background relative overflow-hidden shadow-2xl">
              <NewRentalPage />
            </div>
          </Route>
          <Route path="/maintenance/add">
            <div className="max-w-[480px] mx-auto h-[100dvh] flex flex-col bg-background relative overflow-hidden shadow-2xl">
              <AddMaintenancePage />
            </div>
          </Route>
          
          <Route>
            <AppShell>
              <Router />
            </AppShell>
          </Route>
        </Switch>
      </WouterRouter>
      <Toaster />
    </TooltipProvider>
  );
}

export default App;

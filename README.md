# Car Cost Comparison App

A modern web application that allows users to compare the total cost of ownership between electric and gasoline vehicles over their lifecycle. This tool helps users make informed decisions when choosing between different types of vehicles by calculating all associated costs including purchase price, fuel/electricity, maintenance, insurance, and resale value.

## Features

### 🚗 Comprehensive Cost Analysis
- **Purchase Price**: Initial vehicle cost
- **Fuel/Electricity Costs**: Calculated based on efficiency and current rates (SI units)
- **Maintenance Costs**: Per-kilometer maintenance expenses
- **Insurance Costs**: Annual insurance premiums
- **Battery Replacement**: Electric vehicle battery replacement costs over lifespan
- **Resale Value**: Estimated resale value after ownership period

### 📊 Advanced Calculations
- **Inflation Adjustment**: All costs are adjusted for inflation over the ownership period
- **Time Value of Money**: Resale values are discounted to present value
- **Real-time Updates**: Calculations update instantly as you modify parameters

### 📈 Visual Data Representation
- **Bar Charts**: Side-by-side comparison of cost breakdowns
- **Pie Charts**: Detailed cost distribution for each vehicle
- **Savings Calculator**: Shows potential savings and percentage difference

### 🎨 Modern UI/UX
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Beautiful Interface**: Modern gradient design with smooth animations
- **Intuitive Controls**: Easy-to-use form inputs with clear labels
- **Real-time Feedback**: Instant visual feedback on cost changes

## Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd CarComparison
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm start
   ```

4. **Open your browser** and navigate to `http://localhost:3000`

## Usage

### Setting Up Vehicle Parameters

#### Electric Vehicle (Car 1)
- **Car Name**: Enter the name of your electric vehicle
- **Purchase Price**: Initial cost of the electric vehicle
- **Efficiency**: Energy consumption in kWh per 100km (typically 15-25 kWh/100km)
- **Electricity Rate**: Cost per kWh in your area
- **Maintenance Cost**: Estimated maintenance cost per kilometer
- **Battery Replacement Cost**: Cost to replace the battery pack
- **Battery Lifespan**: Expected battery life in kilometers before replacement
- **Annual Insurance**: Yearly insurance premium
- **Resale Value**: Expected percentage of original value after ownership period

#### Gasoline Vehicle (Car 2)
- **Car Name**: Enter the name of your gasoline vehicle
- **Purchase Price**: Initial cost of the gasoline vehicle
- **Fuel Consumption**: Fuel consumption in liters per 100km (typically 6-12 L/100km)
- **Fuel Price**: Current cost per liter of fuel
- **Maintenance Cost**: Estimated maintenance cost per kilometer
- **Annual Insurance**: Yearly insurance premium
- **Resale Value**: Expected percentage of original value after ownership period

#### Common Parameters
- **Years of Ownership**: How long you plan to own the vehicle
- **Annual Kilometers Driven**: Expected yearly distance in kilometers
- **Annual Inflation Rate**: Expected annual inflation rate (typically 2-3%)

### Understanding the Results

The application provides several key insights:

1. **Total Cost Comparison**: Shows the total cost of ownership for both vehicles
2. **Savings Calculation**: Displays potential savings and percentage difference
3. **Cost Breakdown**: Visual representation of how costs are distributed
4. **Interactive Charts**: Detailed breakdowns with hover tooltips

## Technology Stack

- **React 18**: Modern React with hooks
- **Recharts**: Professional charting library
- **Lucide React**: Beautiful icon library
- **CSS3**: Modern styling with gradients and animations
- **Responsive Design**: Mobile-first approach

## Key Features Explained

### Cost Calculation Methodology

The application uses a comprehensive approach to calculate total cost of ownership:

1. **Initial Cost**: Purchase price of the vehicle
2. **Operating Costs**: 
   - Fuel costs (gasoline) or electricity costs (EV)
   - Maintenance costs per mile
   - Annual insurance premiums
3. **Inflation Adjustment**: All future costs are adjusted for inflation
4. **Resale Value**: Estimated resale value discounted to present value

### Real-world Considerations

The calculator includes several real-world factors:
- **Inflation**: Future costs increase over time
- **Time Value of Money**: Money today is worth more than money in the future
- **Variable Costs**: Fuel/electricity prices and maintenance costs vary by vehicle type
- **Depreciation**: Different vehicles depreciate at different rates

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

If you have any questions or need help with the application, please open an issue on the GitHub repository. 
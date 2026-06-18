


export const calculateFuelCost = (distanceKm, petrolPrice = 100) => {
  const averageMileage = 15; 
  const litersNeeded = distanceKm / averageMileage;
  const fuelCost = litersNeeded * petrolPrice;
  return Math.round(fuelCost);
};


export const estimateTollCosts = (distanceKm) => {
  
  
  const numberOfTolls = Math.floor(distanceKm / 75);
  const avgTollCost = 150; 
  return {
    numberOfTolls,
    totalTollCost: numberOfTolls * avgTollCost
  };
};


export const calculateAccommodationCost = (days, budgetType = 'mid') => {
  const rates = {
    budget: 1000,
    mid: 2000,
    luxury: 5000
  };
  
  const perNightRate = rates[budgetType] || rates.mid;
  const nights = Math.max(0, days - 1); 
  
  return {
    nights,
    perNightRate,
    totalAccommodationCost: nights * perNightRate
  };
};


export const calculateFoodCost = (days, budgetType = 'mid') => {
  const rates = {
    budget: 1000,
    mid: 1500,
    luxury: 3000
  };
  
  const perDayRate = rates[budgetType] || rates.mid;
  
  return {
    days,
    perDayRate,
    totalFoodCost: days * perDayRate
  };
};


export const calculateTripCost = (distanceKm, days = 1, budgetType = 'mid') => {
  
  if (days <= 0) {
    days = Math.max(1, Math.ceil(distanceKm / 300)); 
  }
  
  const fuelCost = calculateFuelCost(distanceKm);
  const { numberOfTolls, totalTollCost } = estimateTollCosts(distanceKm);
  const { nights, totalAccommodationCost } = calculateAccommodationCost(days, budgetType);
  const { totalFoodCost } = calculateFoodCost(days, budgetType);
  
  
  const miscellaneousCost = Math.round(distanceKm * 2); 
  
  const totalCost = fuelCost + totalTollCost + totalAccommodationCost + totalFoodCost + miscellaneousCost;
  
  return {
    fuelCost,
    tollCost: totalTollCost,
    numberOfTolls,
    accommodationCost: totalAccommodationCost,
    nights,
    foodCost: totalFoodCost,
    days,
    miscellaneousCost,
    totalCost: Math.round(totalCost)
  };
};


export const formatCurrency = (amount) => {
  if (typeof amount !== 'number') return '₹0';
  
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};


export const calculatePerPersonCost = (totalCost, numberOfPeople = 1) => {
  if (numberOfPeople <= 0) numberOfPeople = 1;
  return {
    totalCost,
    numberOfPeople,
    perPersonCost: Math.round(totalCost / numberOfPeople)
  };
};


export const generateCostBreakdownText = (costDetails) => {
  return `💰 Cost Breakdown:
• Fuel: ${formatCurrency(costDetails.fuelCost)}
• Tolls: ${formatCurrency(costDetails.tollCost)} (${costDetails.numberOfTolls} tolls)
• Accommodation: ${formatCurrency(costDetails.accommodationCost)} (${costDetails.nights || 0} nights)
• Food: ${formatCurrency(costDetails.foodCost)} (${costDetails.days || 1} days)
• Miscellaneous: ${formatCurrency(costDetails.miscellaneousCost || 0)}
━━━━━━━━━━━━━━━
Total: ${formatCurrency(costDetails.totalCost)}`;
};


export const estimateTripDuration = (distanceKm) => {
  const averageSpeed = 50; 
  const durationHours = distanceKm / averageSpeed;
  const breakTime = Math.floor(distanceKm / 200) * 30; 
  
  return {
    drivingHours: Math.round(durationHours * 10) / 10,
    breakMinutes: breakTime,
    totalHours: Math.round((durationHours + (breakTime / 60)) * 10) / 10
  };
};

export default {
  calculateFuelCost,
  estimateTollCosts,
  calculateAccommodationCost,
  calculateFoodCost,
  calculateTripCost,
  formatCurrency,
  calculatePerPersonCost,
  generateCostBreakdownText,
  estimateTripDuration
};
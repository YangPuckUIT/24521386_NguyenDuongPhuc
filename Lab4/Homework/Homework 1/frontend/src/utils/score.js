export const calculateScore = (swipes) => {
  return swipes.reduce((total, swipe) => {
    switch (swipe.action) {
      case "like":
        return total + 10;

      case "superlike":
        return total + 20;

      case "reject":
        return total - 5;

      default:
        return total;
    }
  }, 0);
};

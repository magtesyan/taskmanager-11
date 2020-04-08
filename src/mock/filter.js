const generateFilters = (tasks) => {
  const filterNames = {
    "all": tasks.length,
    "overdue": tasks.filter((el) => el.dueDate !== null && el.dueDate < new Date()).length,
    "today": tasks.filter((el) => el.dueDate !== null && new Date(el.dueDate).setHours(0, 0, 0, 0) === new Date().setHours(0, 0, 0, 0)).length,
    "favorites": tasks.filter((el) => el.isFavorite).length,
    "repeating": tasks.filter((el) => el.dueDate === null).length,
    "archive": tasks.filter((el) => el.isArchive).length,
  };

  return Object.keys(filterNames).map((it) => {
    return {
      name: it,
      count: filterNames[it],
    };
  });
};


export {generateFilters};

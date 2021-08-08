export const displayAvailableDepartmentsOptions = departments => {
  return departments.map(department => {
    return (
      <option key={department.id} value={department.id}>
        {department.name}
      </option>
    );
  });
};

export const displayAvailableLocationsOptions = locations => {
  return locations.map(location => {
    return (
      <option key={location.id} value={location.id}>
        {location.state}
      </option>
    );
  });
};

export const displayAvailableTitlesOptions = titles => {
  return titles.map(title => {
    return (
      <option key={title.id} value={title.id}>
        {title.jobtitle}
      </option>
    );
  });
};

module.exports = (time, type) => {
  switch (type) {
    case 'SECONDS':
      return ((time - Date.now()) / 1000);
    case 'MINUTES':
      return ((time - Date.now()) / ( 1000 * 60 ));
    case 'HOURS':
      return ((time - Date.now()) / ( 1000 * 60 * 60 ));
    case 'HOURS_BSNS':
      return ((Date.now() - time) / ( 1000 * 60 * 60 ));
    case 'DAYS':
      return ((time - Date.now()) / ( 1000 * 60 * 60 * 24 ));
    case 'WEEKS':
      return ((time - Date.now()) / ( 1000 * 60 * 60 * 24 * 7 ));
    case 'IN_SECONDS':
      return (( time * 1000 ) + Date.now() );
    case 'IN_MINUTES':
      return (( time * 1000 * 60 ) + Date.now() );
    case 'IN_HOURS':
      return (( time * 1000 * 60 * 60 ) + Date.now() );
    case 'IN_DAYS':
      return (( time * 1000 * 60 * 60 * 24 ) + Date.now() );
    case 'IN_WEEKS':
      return (( time * 1000 * 60 * 60 * 24 * 7 ) + Date.now() );
    default:
      console.log('CMOT: type not found');
  }
};

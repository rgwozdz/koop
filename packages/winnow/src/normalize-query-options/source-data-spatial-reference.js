const normalizeSpatialReference = require('./spatial-reference');
const { getCollectionCrs } = require('./helpers');
const { logger } = require('../logger');

function normalizeSourceDataSpatialReference ({ inputCrs, sourceSR, collection } = {}) {
  const sourceDataSpatialReference = inputCrs || sourceSR || getCollectionCrs(collection);
  if (!sourceDataSpatialReference) return { wkid: 4326 };

  const spatialReference = normalizeSpatialReference(sourceDataSpatialReference);

  if (!spatialReference) {
    logger.debug(`spatial reference "${sourceDataSpatialReference}" could not be normalized. Defaulting to EPSG:4326.`);
    // @TODO: throw error?
  }
  return spatialReference || { wkid: 4326 };
}

module.exports = normalizeSourceDataSpatialReference;

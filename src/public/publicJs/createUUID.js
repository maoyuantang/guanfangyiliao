/**
 * 生成并暴露出uuid
 */
"use strict"
import uuid  from 'uuid'
export default () => uuid.v1().replace(/-/g, "")
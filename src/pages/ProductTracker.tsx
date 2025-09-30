import { useState } from 'react'

interface Product {
  id: string
  batchId: string
  productCode: string
  qrCode: string
  name: string
  weight: string
  flavor: string
  productionDate: string
  expirationDate: string
  status: 'production' | 'quality-check' | 'packaging' | 'shipped' | 'delivered'
  supplyChain: {
    source: string
    processor: string
    facility: string
    distributor?: string
    retailer?: string
  }
  blockchain: {
    txHash: string
    verified: boolean
    lastUpdate: string
  }
  smartPackaging: {
    nfcEnabled: boolean
    temperatureMonitor: boolean
    tamperProof: boolean
    authenticitySealed: boolean
  }
  qualityMetrics: {
    moistureContent: number
    waterActivity: number
    saltContent: number
    proteinContent: number
  }
}

const mockProducts: Product[] = [
  {
    id: 'JRK-2024-001',
    batchId: 'A-42',
    productCode: 'HIK-BEF-100G',
    qrCode: 'QR_JRK_2024_001_Rabbit_HICKORY',
    name: 'Hickory Smoked Rabbit Jerky',
    weight: '100g',
    flavor: 'Hickory',
    productionDate: '2024-09-30',
    expirationDate: '2025-03-30',
    status: 'packaging',
    supplyChain: {
      source: 'Ranch Valley Farms, TX',
      processor: 'Premium Meat Processing Co.',
      facility: 'Jerky Lab Production - Bay 3',
      distributor: 'Fresh Foods Distribution'
    },
    blockchain: {
      txHash: '0x742d35cc6e7c5c8d0c1c9f5c2f8a6b4d3e9f1c2a8b7e6d4c3a2b1c9d8e7f6a5b4c3d2e1f',
      verified: true,
      lastUpdate: '2024-09-30T14:22:15Z'
    },
    smartPackaging: {
      nfcEnabled: true,
      temperatureMonitor: true,
      tamperProof: true,
      authenticitySealed: true
    },
    qualityMetrics: {
      moistureContent: 18.5,
      waterActivity: 0.82,
      saltContent: 3.2,
      proteinContent: 67.8
    }
  },
  {
    id: 'JRK-2024-002',
    batchId: 'A-41',
    productCode: 'TER-BEF-85G',
    qrCode: 'QR_JRK_2024_002_Rabbit_TERIYAKI',
    name: 'Teriyaki Rabbit Jerky',
    weight: '85g',
    flavor: 'Teriyaki',
    productionDate: '2024-09-29',
    expirationDate: '2025-03-29',
    status: 'shipped',
    supplyChain: {
      source: 'Grass Fed Cattle Co., MT',
      processor: 'Premium Meat Processing Co.',
      facility: 'Jerky Lab Production - Bay 1',
      distributor: 'Fresh Foods Distribution',
      retailer: 'Gourmet Market Chain'
    },
    blockchain: {
      txHash: '0x8f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f',
      verified: true,
      lastUpdate: '2024-09-29T09:15:42Z'
    },
    smartPackaging: {
      nfcEnabled: true,
      temperatureMonitor: true,
      tamperProof: true,
      authenticitySealed: true
    },
    qualityMetrics: {
      moistureContent: 19.2,
      waterActivity: 0.85,
      saltContent: 2.8,
      proteinContent: 65.3
    }
  },
  {
    id: 'JRK-2024-003',
    batchId: 'A-40',
    productCode: 'PEP-BEF-100G',
    qrCode: 'QR_JRK_2024_003_Rabbit_PEPPER',
    name: 'Black Pepper Rabbit Jerky',
    weight: '100g',
    flavor: 'Black Pepper',
    productionDate: '2024-09-28',
    expirationDate: '2025-03-28',
    status: 'delivered',
    supplyChain: {
      source: 'Organic Rabbit Suppliers, CA',
      processor: 'Premium Meat Processing Co.',
      facility: 'Jerky Lab Production - Bay 2',
      distributor: 'Natural Foods Network',
      retailer: 'Whole Foods Market'
    },
    blockchain: {
      txHash: '0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a',
      verified: true,
      lastUpdate: '2024-09-28T16:45:33Z'
    },
    smartPackaging: {
      nfcEnabled: true,
      temperatureMonitor: false,
      tamperProof: true,
      authenticitySealed: true
    },
    qualityMetrics: {
      moistureContent: 17.8,
      waterActivity: 0.79,
      saltContent: 3.5,
      proteinContent: 68.9
    }
  }
]

const ProductTracker = () => {
  const [products] = useState<Product[]>(mockProducts)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [filterStatus, setFilterStatus] = useState<string>('all')

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'production': return '#ff9500'
      case 'quality-check': return '#007aff'
      case 'packaging': return '#5856d6'
      case 'shipped': return '#00c7be'
      case 'delivered': return '#30d158'
      default: return '#8e8e93'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'production': return 'In Production'
      case 'quality-check': return 'Quality Check'
      case 'packaging': return 'Packaging'
      case 'shipped': return 'Shipped'
      case 'delivered': return 'Delivered'
      default: return 'Unknown'
    }
  }

  const filteredProducts = filterStatus === 'all' 
    ? products 
    : products.filter(product => product.status === filterStatus)

  const generateQRCode = (productCode: string) => {
    // Simulate QR code generation
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
      `https://jerk-y.web.app/verify/${productCode}`
    )}`
  }

  return (
    <div className="product-tracker">
      <div className="tracker-header">
        <div className="tracker-title">
          <h1>Product Tracker</h1>
          <p>Blockchain-verified supply chain tracking with smart packaging</p>
        </div>
        <div className="tracker-stats">
          <div className="stat-card">
            <span className="stat-number">{products.length}</span>
            <span className="stat-label">Total Products</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">{products.filter(p => p.blockchain.verified).length}</span>
            <span className="stat-label">Verified</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">{products.filter(p => p.smartPackaging.nfcEnabled).length}</span>
            <span className="stat-label">NFC Enabled</span>
          </div>
        </div>
      </div>

      <div className="tracker-filters">
        <select 
          value={filterStatus} 
          onChange={(e) => setFilterStatus(e.target.value)}
          className="status-filter"
        >
          <option value="all">All Status</option>
          <option value="production">In Production</option>
          <option value="quality-check">Quality Check</option>
          <option value="packaging">Packaging</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
        </select>
      </div>

      <div className="product-grid">
        {filteredProducts.map((product) => (
          <div 
            key={product.id} 
            className="product-card"
            onClick={() => setSelectedProduct(product)}
          >
            <div className="product-header">
              <div className="product-id">{product.id}</div>
              <div 
                className="product-status"
                style={{ backgroundColor: getStatusColor(product.status) }}
              >
                {getStatusText(product.status)}
              </div>
            </div>
            <div className="product-info">
              <h3>{product.name}</h3>
              <p className="product-details">
                Batch {product.batchId} • {product.weight} • {product.flavor}
              </p>
              <p className="product-date">
                Produced: {new Date(product.productionDate).toLocaleDateString()}
              </p>
            </div>
            <div className="product-features">
              {product.blockchain.verified && (
                <span className="feature-badge verified">✓ Blockchain Verified</span>
              )}
              {product.smartPackaging.nfcEnabled && (
                <span className="feature-badge nfc">📱 NFC Enabled</span>
              )}
              {product.smartPackaging.tamperProof && (
                <span className="feature-badge tamper">🔒 Tamper Proof</span>
              )}
            </div>
            <div className="product-qr">
              <img 
                src={generateQRCode(product.productCode)} 
                alt={`QR Code for ${product.name}`}
                className="qr-code"
              />
            </div>
          </div>
        ))}
      </div>

      {selectedProduct && (
        <div className="product-modal" onClick={() => setSelectedProduct(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{selectedProduct.name}</h2>
              <button 
                onClick={() => setSelectedProduct(null)}
                className="modal-close"
              >
                ×
              </button>
            </div>
            
            <div className="modal-body">
              <div className="modal-section">
                <h3>Product Information</h3>
                <div className="info-grid">
                  <div className="info-item">
                    <span className="info-label">Product ID</span>
                    <span className="info-value">{selectedProduct.id}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Batch ID</span>
                    <span className="info-value">{selectedProduct.batchId}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Weight</span>
                    <span className="info-value">{selectedProduct.weight}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Flavor</span>
                    <span className="info-value">{selectedProduct.flavor}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Production Date</span>
                    <span className="info-value">{new Date(selectedProduct.productionDate).toLocaleDateString()}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Expiration Date</span>
                    <span className="info-value">{new Date(selectedProduct.expirationDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              <div className="modal-section">
                <h3>Supply Chain</h3>
                <div className="supply-chain">
                  <div className="chain-step">
                    <div className="step-icon">🏭</div>
                    <div className="step-info">
                      <div className="step-title">Source</div>
                      <div className="step-detail">{selectedProduct.supplyChain.source}</div>
                    </div>
                  </div>
                  <div className="chain-step">
                    <div className="step-icon">⚙️</div>
                    <div className="step-info">
                      <div className="step-title">Processor</div>
                      <div className="step-detail">{selectedProduct.supplyChain.processor}</div>
                    </div>
                  </div>
                  <div className="chain-step">
                    <div className="step-icon">🏢</div>
                    <div className="step-info">
                      <div className="step-title">Facility</div>
                      <div className="step-detail">{selectedProduct.supplyChain.facility}</div>
                    </div>
                  </div>
                  {selectedProduct.supplyChain.distributor && (
                    <div className="chain-step">
                      <div className="step-icon">🚚</div>
                      <div className="step-info">
                        <div className="step-title">Distributor</div>
                        <div className="step-detail">{selectedProduct.supplyChain.distributor}</div>
                      </div>
                    </div>
                  )}
                  {selectedProduct.supplyChain.retailer && (
                    <div className="chain-step">
                      <div className="step-icon">🏪</div>
                      <div className="step-info">
                        <div className="step-title">Retailer</div>
                        <div className="step-detail">{selectedProduct.supplyChain.retailer}</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="modal-section">
                <h3>Blockchain Verification</h3>
                <div className="blockchain-info">
                  <div className="blockchain-status">
                    <span className={`verification-badge ${selectedProduct.blockchain.verified ? 'verified' : 'pending'}`}>
                      {selectedProduct.blockchain.verified ? '✓ Verified' : '⏳ Pending'}
                    </span>
                  </div>
                  <div className="blockchain-details">
                    <div className="detail-row">
                      <span className="detail-label">Transaction Hash</span>
                      <span className="detail-value hash">{selectedProduct.blockchain.txHash.slice(0, 20)}...</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Last Update</span>
                      <span className="detail-value">{new Date(selectedProduct.blockchain.lastUpdate).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="modal-section">
                <h3>Smart Packaging</h3>
                <div className="packaging-features">
                  <div className={`feature-item ${selectedProduct.smartPackaging.nfcEnabled ? 'enabled' : 'disabled'}`}>
                    <span className="feature-icon">📱</span>
                    <span className="feature-name">NFC Enabled</span>
                    <span className="feature-status">{selectedProduct.smartPackaging.nfcEnabled ? 'Yes' : 'No'}</span>
                  </div>
                  <div className={`feature-item ${selectedProduct.smartPackaging.temperatureMonitor ? 'enabled' : 'disabled'}`}>
                    <span className="feature-icon">🌡️</span>
                    <span className="feature-name">Temperature Monitor</span>
                    <span className="feature-status">{selectedProduct.smartPackaging.temperatureMonitor ? 'Yes' : 'No'}</span>
                  </div>
                  <div className={`feature-item ${selectedProduct.smartPackaging.tamperProof ? 'enabled' : 'disabled'}`}>
                    <span className="feature-icon">🔒</span>
                    <span className="feature-name">Tamper Proof</span>
                    <span className="feature-status">{selectedProduct.smartPackaging.tamperProof ? 'Yes' : 'No'}</span>
                  </div>
                  <div className={`feature-item ${selectedProduct.smartPackaging.authenticitySealed ? 'enabled' : 'disabled'}`}>
                    <span className="feature-icon">✅</span>
                    <span className="feature-name">Authenticity Sealed</span>
                    <span className="feature-status">{selectedProduct.smartPackaging.authenticitySealed ? 'Yes' : 'No'}</span>
                  </div>
                </div>
              </div>

              <div className="modal-section">
                <h3>Quality Metrics</h3>
                <div className="quality-grid">
                  <div className="quality-metric">
                    <span className="metric-label">Moisture Content</span>
                    <span className="metric-value">{selectedProduct.qualityMetrics.moistureContent}%</span>
                  </div>
                  <div className="quality-metric">
                    <span className="metric-label">Water Activity</span>
                    <span className="metric-value">{selectedProduct.qualityMetrics.waterActivity}</span>
                  </div>
                  <div className="quality-metric">
                    <span className="metric-label">Salt Content</span>
                    <span className="metric-value">{selectedProduct.qualityMetrics.saltContent}%</span>
                  </div>
                  <div className="quality-metric">
                    <span className="metric-label">Protein Content</span>
                    <span className="metric-value">{selectedProduct.qualityMetrics.proteinContent}%</span>
                  </div>
                </div>
              </div>

              <div className="modal-section">
                <h3>QR Code</h3>
                <div className="qr-section">
                  <img 
                    src={generateQRCode(selectedProduct.productCode)} 
                    alt={`QR Code for ${selectedProduct.name}`}
                    className="qr-code-large"
                  />
                  <p className="qr-description">
                    Scan this QR code to verify product authenticity and view supply chain information on the blockchain.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductTracker
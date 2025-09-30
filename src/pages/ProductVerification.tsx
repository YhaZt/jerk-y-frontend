import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

interface Product {
  id: string
  batchId: string
  productCode: string
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
    blockNumber?: number
    network?: string
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
  certifications: string[]
  nutritionFacts: {
    calories: number
    protein: number
    fat: number
    carbs: number
    sodium: number
  }
}

// Simulated product database
const productDatabase: Record<string, Product> = {
  'HIK-BEF-100G': {
    id: 'JRK-2024-001',
    batchId: 'A-42',
    productCode: 'HIK-BEF-100G',
    name: 'Hickory Smoked Rabbit Jerky',
    weight: '100g',
    flavor: 'Hickory',
    productionDate: '2024-09-30',
    expirationDate: '2025-03-30',
    status: 'delivered',
    supplyChain: {
      source: 'Ranch Valley Farms, TX',
      processor: 'Premium Meat Processing Co.',
      facility: 'Jerky Lab Production - Bay 3',
      distributor: 'Fresh Foods Distribution',
      retailer: 'Verified at Consumer'
    },
    blockchain: {
      txHash: '0x742d35cc6e7c5c8d0c1c9f5c2f8a6b4d3e9f1c2a8b7e6d4c3a2b1c9d8e7f6a5b4c3d2e1f',
      verified: true,
      lastUpdate: '2024-09-30T14:22:15Z',
      blockNumber: 18234567,
      network: 'Polygon Mainnet'
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
    },
    certifications: ['USDA Organic', 'Non-GMO', 'Grass Fed', 'Gluten Free'],
    nutritionFacts: {
      calories: 80,
      protein: 14,
      fat: 1.5,
      carbs: 2,
      sodium: 590
    }
  },
  'TER-BEF-85G': {
    id: 'JRK-2024-002',
    batchId: 'A-41',
    productCode: 'TER-BEF-85G',
    name: 'Teriyaki Rabbit Jerky',
    weight: '85g',
    flavor: 'Teriyaki',
    productionDate: '2024-09-29',
    expirationDate: '2025-03-29',
    status: 'delivered',
    supplyChain: {
      source: 'Grass Fed Cattle Co., MT',
      processor: 'Premium Meat Processing Co.',
      facility: 'Jerky Lab Production - Bay 1',
      distributor: 'Fresh Foods Distribution',
      retailer: 'Verified at Consumer'
    },
    blockchain: {
      txHash: '0x8f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f',
      verified: true,
      lastUpdate: '2024-09-29T09:15:42Z',
      blockNumber: 18234512,
      network: 'Polygon Mainnet'
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
    },
    certifications: ['USDA Organic', 'Non-GMO', 'Gluten Free'],
    nutritionFacts: {
      calories: 75,
      protein: 13,
      fat: 1,
      carbs: 3,
      sodium: 520
    }
  },
  'PEP-BEF-100G': {
    id: 'JRK-2024-003',
    batchId: 'A-40',
    productCode: 'PEP-BEF-100G',
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
      retailer: 'Verified at Consumer'
    },
    blockchain: {
      txHash: '0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a',
      verified: true,
      lastUpdate: '2024-09-28T16:45:33Z',
      blockNumber: 18234445,
      network: 'Polygon Mainnet'
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
    },
    certifications: ['USDA Organic', 'Non-GMO', 'Grass Fed', 'Gluten Free', 'Keto Friendly'],
    nutritionFacts: {
      calories: 85,
      protein: 15,
      fat: 2,
      carbs: 1,
      sodium: 620
    }
  }
}

const ProductVerification = () => {
  const { productCode } = useParams<{ productCode: string }>()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [verificationTime] = useState(new Date())

  useEffect(() => {
    // Simulate API call delay
    const timer = setTimeout(() => {
      if (productCode && productDatabase[productCode]) {
        setProduct(productDatabase[productCode])
      }
      setLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [productCode])

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

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  if (loading) {
    return (
      <div className="verification-page">
        <div className="verification-loading">
          <div className="loading-spinner"></div>
          <h2>Verifying Product...</h2>
          <p>Checking blockchain records and supply chain data</p>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="verification-page">
        <div className="verification-error">
          <div className="error-icon">❌</div>
          <h2>Product Not Found</h2>
          <p>The product code <strong>{productCode}</strong> could not be verified.</p>
          <div className="error-reasons">
            <h4>This could mean:</h4>
            <ul>
              <li>Invalid or expired QR code</li>
              <li>Product not yet registered in blockchain</li>
              <li>Counterfeit product</li>
            </ul>
          </div>
          <Link to="/" className="back-home-btn">
            Return to Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="verification-page">
      <div className="verification-header">
        <div className="verification-badge">
          <span className="badge-icon">✅</span>
          <span className="badge-text">Authentic Product Verified</span>
        </div>
        <div className="verification-time">
          Verified on {verificationTime.toLocaleString()}
        </div>
      </div>

      <div className="product-hero">
        <div className="product-main-info">
          <h1>{product.name}</h1>
          <div className="product-meta">
            <span className="product-id">ID: {product.id}</span>
            <span 
              className="product-status"
              style={{ backgroundColor: getStatusColor(product.status) }}
            >
              {product.status.replace('-', ' ').toUpperCase()}
            </span>
          </div>
          <div className="product-details">
            <span>Batch {product.batchId}</span>
            <span>•</span>
            <span>{product.weight}</span>
            <span>•</span>
            <span>{product.flavor} Flavor</span>
          </div>
        </div>
        
        <div className="blockchain-verification">
          <h3>Blockchain Verified</h3>
          <div className="blockchain-details">
            <div className="detail-item">
              <span className="detail-label">Network</span>
              <span className="detail-value">{product.blockchain.network}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Block</span>
              <span className="detail-value">#{product.blockchain.blockNumber}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Transaction</span>
              <div className="hash-container">
                <span className="detail-value hash">{product.blockchain.txHash.slice(0, 10)}...{product.blockchain.txHash.slice(-8)}</span>
                <button 
                  onClick={() => copyToClipboard(product.blockchain.txHash)}
                  className="copy-btn"
                  title="Copy full hash"
                >
                  📋
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="verification-content">
        <div className="info-section">
          <h3>Production Information</h3>
          <div className="info-grid">
            <div className="info-card">
              <div className="info-icon">📅</div>
              <div className="info-content">
                <span className="info-label">Production Date</span>
                <span className="info-value">{new Date(product.productionDate).toLocaleDateString()}</span>
              </div>
            </div>
            <div className="info-card">
              <div className="info-icon">⏰</div>
              <div className="info-content">
                <span className="info-label">Best Before</span>
                <span className="info-value">{new Date(product.expirationDate).toLocaleDateString()}</span>
              </div>
            </div>
            <div className="info-card">
              <div className="info-icon">🏭</div>
              <div className="info-content">
                <span className="info-label">Facility</span>
                <span className="info-value">{product.supplyChain.facility}</span>
              </div>
            </div>
            <div className="info-card">
              <div className="info-icon">🌱</div>
              <div className="info-content">
                <span className="info-label">Source</span>
                <span className="info-value">{product.supplyChain.source}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="info-section">
          <h3>Quality Assurance</h3>
          <div className="quality-metrics">
            <div className="metric-item">
              <span className="metric-label">Moisture Content</span>
              <div className="metric-bar">
                <div 
                  className="metric-fill"
                  style={{ width: `${(product.qualityMetrics.moistureContent / 25) * 100}%` }}
                ></div>
              </div>
              <span className="metric-value">{product.qualityMetrics.moistureContent}%</span>
            </div>
            <div className="metric-item">
              <span className="metric-label">Water Activity</span>
              <div className="metric-bar">
                <div 
                  className="metric-fill"
                  style={{ width: `${(product.qualityMetrics.waterActivity / 1) * 100}%` }}
                ></div>
              </div>
              <span className="metric-value">{product.qualityMetrics.waterActivity}</span>
            </div>
            <div className="metric-item">
              <span className="metric-label">Protein Content</span>
              <div className="metric-bar">
                <div 
                  className="metric-fill"
                  style={{ width: `${(product.qualityMetrics.proteinContent / 80) * 100}%` }}
                ></div>
              </div>
              <span className="metric-value">{product.qualityMetrics.proteinContent}%</span>
            </div>
          </div>
        </div>

        <div className="info-section">
          <h3>Certifications</h3>
          <div className="certifications">
            {product.certifications.map((cert, index) => (
              <span key={index} className="certification-badge">
                ✓ {cert}
              </span>
            ))}
          </div>
        </div>

        <div className="info-section">
          <h3>Nutrition Facts</h3>
          <div className="nutrition-facts">
            <div className="nutrition-header">Per {product.weight} serving</div>
            <div className="nutrition-grid">
              <div className="nutrition-item">
                <span className="nutrition-label">Calories</span>
                <span className="nutrition-value">{product.nutritionFacts.calories}</span>
              </div>
              <div className="nutrition-item">
                <span className="nutrition-label">Protein</span>
                <span className="nutrition-value">{product.nutritionFacts.protein}g</span>
              </div>
              <div className="nutrition-item">
                <span className="nutrition-label">Total Fat</span>
                <span className="nutrition-value">{product.nutritionFacts.fat}g</span>
              </div>
              <div className="nutrition-item">
                <span className="nutrition-label">Carbohydrates</span>
                <span className="nutrition-value">{product.nutritionFacts.carbs}g</span>
              </div>
              <div className="nutrition-item">
                <span className="nutrition-label">Sodium</span>
                <span className="nutrition-value">{product.nutritionFacts.sodium}mg</span>
              </div>
            </div>
          </div>
        </div>

        <div className="info-section">
          <h3>Smart Packaging Features</h3>
          <div className="smart-features">
            <div className={`feature ${product.smartPackaging.nfcEnabled ? 'enabled' : 'disabled'}`}>
              <span className="feature-icon">📱</span>
              <span className="feature-text">NFC Authentication</span>
              <span className="feature-status">{product.smartPackaging.nfcEnabled ? 'Active' : 'Inactive'}</span>
            </div>
            <div className={`feature ${product.smartPackaging.temperatureMonitor ? 'enabled' : 'disabled'}`}>
              <span className="feature-icon">🌡️</span>
              <span className="feature-text">Temperature Monitoring</span>
              <span className="feature-status">{product.smartPackaging.temperatureMonitor ? 'Active' : 'Inactive'}</span>
            </div>
            <div className={`feature ${product.smartPackaging.tamperProof ? 'enabled' : 'disabled'}`}>
              <span className="feature-icon">🔒</span>
              <span className="feature-text">Tamper Detection</span>
              <span className="feature-status">{product.smartPackaging.tamperProof ? 'Secure' : 'Standard'}</span>
            </div>
            <div className={`feature ${product.smartPackaging.authenticitySealed ? 'enabled' : 'disabled'}`}>
              <span className="feature-icon">✅</span>
              <span className="feature-text">Authenticity Seal</span>
              <span className="feature-status">{product.smartPackaging.authenticitySealed ? 'Verified' : 'Standard'}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="verification-footer">
        <div className="footer-content">
          <p>This product has been verified through blockchain technology and meets all quality standards.</p>
          <div className="footer-actions">
            <Link to="/product-tracker" className="action-btn secondary">
              View All Products
            </Link>
            <Link to="/" className="action-btn primary">
              Visit Jerky Lab
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductVerification